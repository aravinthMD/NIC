import { Component, OnInit,ViewChild ,Input,AfterViewInit, ElementRef} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ProformaInvoiceDialogFormComponent} from './proforma-invoice-dialog-form/proforma-invoice-dialog-form.component'
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router'
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { SearchService } from '../../../services/search.service';
import{ApiService} from '../../../services/api.service'
import { ClientDetailsService } from '@services/client-details.service';
import { MatInput } from '@angular/material';
import { CsvDataService } from '@services/csv-data.service';

import { CsvUploadModalComponent } from '../../../protectedPages/csv-upload-modal/csv-upload-modal.component';

import { UtilityService } from '@services/utility.service';
import { CsvUploadService } from '@services/csv-upload.service';
import { FileToBase64Service } from '@services/file-to-base64.service';
@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  
})
export class ProcessDetailsComponent implements OnInit{

  userId:string ;
  @Input('userObj') user : any;

  data : string = ''

  file : any;
  documentUploadId : string = ''

  @ViewChild('dateFeild', { read: MatInput,static  :true}) input: MatInput;

  length: number;
  pageSize : number;
  currentPage = 1;

  uploadedData : any = {}

  storeProjectNo: string;
  displayedColumns : string[] = ['InvoiceNo','accountName','piAmt',"reminder","Escalation","Action"]
  piStatusData = [];
  // paymentStatusData = [{key:0,value:'Received'},{key:1,value:'Pending'},{key:2,value:'On Hold'}]
  paymentStatusData = [];
  nicsiData = [
    {
      key: '1',
      value: 'ukjena@nic.in'
    },
    {
      key: '2',
      value: 'vinod.agrawal@nic.in'
    },
    {
      key: '3',
      value: 'rk.raina@nic.in'
    },
    {
      key: '4',
      value: 'sshanker@nic.in'
    },
    {
      key: '5',
      value: 'Deepak.saxena@nic.in'
    }
  ]
  dataSource = [];
  labels: any;
  form : FormGroup;
  isDirty: boolean;
  searchForm: FormGroup;
  accountName: string;
  status: string;
  showEmailModal: boolean;
  propertyFlag: boolean;
  modalData: {
    title: string;
    request: any
  }
  showDataSaveModal: boolean;
  dataValue: {
    title: string;
    message ?: string
  };

  isWrite = false;
  isClientActive = true;
  csvResponse: any;
  @ViewChild('inputCsvFile', {static: false}) inputCsvFile: ElementRef;
  constructor(
        private dialog: MatDialog,
        private labelsService: LabelsService,
        private formBuilder : FormBuilder,
        private datePipe: DatePipe,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService,
        private toasterService: ToasterService,
        private router: Router,
        private invoiceService : InvoiceService,
        private searchService: SearchService,
        private apiService:ApiService,
        private clientDetailService:ClientDetailsService,
        private utilityService: UtilityService,
        private csvUploadService: CsvUploadService,
        private fileToBase64Service: FileToBase64Service
        ) { 
          // const data = this.activatedRoute.parent.snapshot.data || {}
          const data = this.utilService.getLovData();
          this.piStatusData = data['piStatus'];
          this.paymentStatusData = data['paymentStatusList'];
    this.form =this.formBuilder.group({
      accountName: [null],
      invoiceNumber : [null],
      refNumber: [null],
      piTraffic: [null],
      piOwner: [null],
      date: [''],
      nicsiManager: [''],
      piAmount: [null],
      startDate:[''],
      endDate:[''],
      piStatus: [''],
      paymentStatus:[''],
      remark:['',[Validators.required]],
      importFile : [null]

    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })

  }

  patchLovValues(){
    const data =  this.activatedRoute.parent.snapshot.data || {};
    const listOfValue = data.listOfValue || {};
    const processVariables = listOfValue.ProcessVariables || {};
    this.piStatusData = processVariables.piStatusList || [];
    this.paymentStatusData = processVariables.paymentStatusList || [];
  }

  async onUploadCsv(event) {
    // const files = event.target.files[0];
    // const fileToRead = files;
    // const fileReader = new FileReader();
    // try {
      // const file: any = await this.fileToBase64Service.convertToBase64(event);
      const data = {
        ...event,
        currentClientId: this.userId,
        // attachment: {
        //   name: file.name,
        //   content: file.base64,
        //   mime: 'application/vnd.ms-excel'
        // }
      };
      this.csvUploadService.uploadCsv(data)
          .subscribe((response: any) => {
              console.log('response', response);
              const error = response.Error;
              const errorMessage = response.ErrorMessage;
              // this.inputCsvFile.nativeElement.value = '';
              if (error !== '0') {
                return this.toasterService.showError(errorMessage, '');
              }

              this.getCsvDataWithValidationMessage();
          });
    // } catch (e) {
    //   this.inputCsvFile.nativeElement.value = '';
    // }
  }

  getCsvFormatForProformaInvoice() {
    const formValue = this.searchForm.value;
    const data = {
      selectedClientId: this.userId,
      fromDate: formValue.searchFrom || '',
      toDate: formValue.searchTo || '',
      searchKeyword: formValue.searchData || '',
      exportCsv: 'true',
    };
    this.invoiceService.getCsvFormatForProformaInvoice(data)
        .subscribe((res: any) => {
            const error = res.Error;
            const message = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(message, '');
            }
            const processVariables = res.ProcessVariables;
            const piList = processVariables.piList;
            if (!piList) {
              return this.toasterService.showInfo('No data available for download', '');
            }
            // const errorObj = processVariables.error;
            // if () {}
            CsvDataService.exportToCsv('Proforma_invoice.csv', piList);
        });
  }

  ngOnInit() {
    this.isClientActive = this.clientDetailService.getClientStatus();

    // this.patchLovValues();     //LOV's
    const smsPage = this.utilityService.getSettingsDataList('PerformaInvoice');
    this.isWrite = smsPage.isWrite;

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['App_name'] || '';
      this.status = val['status'] || '';
      this.form.controls['accountName'].setValue(this.accountName);
    })

    this.activatedRoute.params.subscribe((value)=> {
      this.storeProjectNo = value.projectNo || 4535;
  });
   // this.userId = this.clientDetailService.getClientId();

    this.activatedRoute.params.subscribe((value) => {
      if (!value) {
        return;
      }
      this.userId = value.id;
      this.fetchAllProformaInvoice(this.currentPage,this.userId);
    });

  }

  OnEdit(Data : any){
    const dialogRef = this.dialog.open(ProformaInvoiceDialogFormComponent,{
      data: Data.selectedPIId
    });

    dialogRef.componentInstance.onFileUpload
             .subscribe((res: any) => {
                console.log('file upload event', res);
                this.uploadFile(res);
             });
    dialogRef.componentInstance.onUpdateProformaInvoice
             .subscribe((data) => {
                this.createProformaInvoice(data);
             });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.fetchAllProformaInvoice(this.currentPage,this.userId);
    });

  }

  fetchAllProformaInvoice(currentPage:any,selectedClientId :string){
      this.invoiceService.fetchAllProformaInvoice(currentPage,selectedClientId).subscribe(
        (response: any) => {
          const { 
            ProcessVariables  : { error : {
              code,
              message
            }}
          } = response;
          console.log(`API Response for Get ALL PI List ${response}`);
          if(code == '0'){
            this.dataSource = response['ProcessVariables']['piDataList'] ? response['ProcessVariables']['piDataList'] : null;
            this.length = response["ProcessVariables"]["totalCount"];
            this.pageSize = response["ProcessVariables"]["dataPerPage"];
          }else{
            this.toasterService.showError(message,'')
          }
      },(error) => {
        console.log(`API Error reponse for get All PI Details List ${error}`)
        this.toasterService.showError(error,'')
      })
  }

  onSubmit(data?: any) {
  
    if(this.form.invalid) {
      this.isDirty = true;
      return;
    }
    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['invoiceDate'] = this.datePipe.transform(this.form.value['invoiceDate'], 'dd/MM/yyyy')
    this.form.value['poDate'] = this.datePipe.transform(this.form.value['poDate'], 'dd/MM/yyyy')

    console.log(this.form.value)
    this.toasterService.showSuccess('Data Saved Successfully','')

      this.showDataSaveModal = true;
      this.dataValue= {
        title: 'Proforma Invoice Saved Successfully',
        message: 'Are you sure you want to proceed project execution page?'
      }
  }

  createProformaInvoice(data?: any) {
     let value: any = {};
     if (data) {
       value = data;
     } else {
      if (this.form.invalid) {
        this.isDirty = true;
        return;
      }

      const feildControls = this.form.controls;
      const AccountName  = feildControls.accountName.value;
      const piNumber = feildControls.invoiceNumber.value;
      const referenceNumber  = feildControls.refNumber.value;
      const traffic = feildControls.piTraffic.value;
      const owner = feildControls.piOwner.value;
      const date = feildControls.date.value;
      const nicsiManager = feildControls.nicsiManager.value;
      const piAmount = feildControls.piAmount.value;
      const startDate = feildControls.startDate.value;
      const endDate = feildControls.endDate.value;
      const piStatus = +feildControls.piStatus.value;
      const paymentStatus = +feildControls.paymentStatus.value;
      const remark = feildControls.remark.value;

      const formattedDate = this.datePipe.transform(date,'dd/MM/yyyy')
      const formattedStartDate = this.datePipe.transform(startDate,'dd/MM/yyyy')
      const formattedEndDate = this.datePipe.transform(endDate,'dd/MM/yyyy')

      const userId = this.userId;
      value = {
        AccountName,
        piNumber,
        referenceNumber,
        traffic,
        owner,
        date : formattedDate,
        nicsiManager,
        piAmount,
        startDate : formattedStartDate,
        endDate : formattedEndDate,
        piStatus,
        paymentStatus,
        remark,
        userId : Number(userId)
      };
     }

     value.upload_document = this.documentUploadId;

      
      

      this.invoiceService.createProformaInvoice(value).subscribe(
        (response: any) => {
          const { 
            ProcessVariables  : { error : {
              code,
              message
            }}
          } = response;
          console.log(`API response for the Create PI :${response}`)
          if(code == '0'){
            this.form.reset();
            this.documentUploadId = '';
            // this.input.value = ''
            this.form.controls['piStatus'].setValue("");
            this.form.controls['paymentStatus'].setValue("");
            this.form.controls['startDate'].setValue("");
            setTimeout(() => {
              // this.form.controls['accountName'].setValue(this.accountName);
              this.form.get('accountName').setValue(this.accountName);
            })
            this.isDirty = false;
            this.toasterService.showSuccess('Proforma Invoice Saved Sucessfully','');
            // this.showDataSaveModal = true
            this.dataValue = {
                title : 'Proforma Invoice Saved Successfully',
                // message  : "Are you sure you want to proceed proforma invoice page?"
            }
            this.fetchAllProformaInvoice(this.currentPage,this.userId);
          }else {
            this.toasterService.showError(message,'');
          }
      },
      (error) => {
        console.log(`API error response for the create Pi ${error}`)
          this.toasterService.showError(error,'')
      })
  }

  saveYes(){
   this.showDataSaveModal = false;
   this.next()
  }
 
  saveCancel() {
   this.showDataSaveModal = false;
  }

  onSearch() {

    const data = this.apiService.api.fetchAllProformaInvoice;
    const params = {
        selectedClientId: this.userId,
        currentPage: 1,
        searchKeyword: this.searchForm.get('searchData').value || '',
        fromDate: this.searchForm.get('searchFrom').value || '',//"2020-12-27T18:30:00.000Z",
        toDate: this.searchForm.get('searchTo').value || '' //"2021-01-05T18:30:00.000Z"
    }
      this.searchService.searchProjectExecution(data,params).subscribe(
        (response) => {
            console.log(`Search API response for the PI ${response}`);
            const respError=response["ProcessVariables"]["error" ];
            if(respError.code=="0")
            {
              console.log('result',response['ProcessVariables']);
              this.dataSource = response["ProcessVariables"]["piDataList" ];
            }
            else 
            { 
              this.toasterService.showError(`${respError.code}: ${respError.message}`, 'Technical error..');
            }
          })
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    });

    this.fetchAllProformaInvoice(1, this.userId);

  }



  sendReminder(element) {
    this.showEmailModal = true;
    this.data = 'Send Mail'

    this.modalData =  {
      title: 'Send Reminder Email',
      request: {
        from: 'akshaya@appiyo.com',
        to: 'arul.auth@nic.in',
        subject: `Test Email: ${element.invoiceNo}`
      }
    }
  }

  sendEscalation(element) {
    this.showEmailModal = true;
    this.data = 'Send Escalation'

    this.modalData =  {
      title: 'Send Escalation Email',
      request: {
        from: 'akshaya@appiyo.com',
        to: 'escalation@nic.in',
        subject: `Test Email: [##201##]_PI REF: ${element.invoiceNo}`
      }
    }

  }

  onOkay() {
    this.showEmailModal = false;
  }

  onCancel() {
    this.showEmailModal = false;
  }

  getDownloadXls(){
  }

  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'date') {

      this.form.patchValue({
        date: ''
      })
      this.toasterService.showError('Please click the date icon to select date','');
    }else if(type == 'startDate') {

      this.form.patchValue({
        startDate: ''
      })
      this.toasterService.showError('Please click the start date icon to select date','');
    }else if(type == 'endDate') {

      this.form.patchValue({
        endDate: ''
      })
      this.toasterService.showError('Please click the end date icon to select date','');
    }else if(type == 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: ''
      })
      this.toasterService.showError('Please click the from date icon to select date','');
    }else if(type == 'searchTo') {
      this.searchForm.patchValue({
        searchTo: ''
      })
      this.toasterService.showError('Please click the to date icon to select date','');
    }
    
  }

  next() {

    // this.utilService.setCurrentUrl('users/projectExecution')

    this.router.navigate([`/users/projectExecution/${this.userId}`])

  }

  back() {

    this.utilService.setCurrentUrl('users/smsCredit')

    this.router.navigate([`/users/smsCredit/${this.storeProjectNo}`])

  }


  // getPIAutoPopulate(clientId : string){
  //       this.invoiceService.getPIAutoPopulationAPI(clientId).subscribe(
  //         (response) => {
  //           const { 
  //             ProcessVariables  : { error : {
  //               code,
  //               message
  //             }}
  //           } = response;

  //           console.log(`API Response for the Get PI Auto Populate ${response}`);
  //           if(code == '0'){
              
  //           }
  //       })
  // }

  getServerData(event?:PageEvent){
    let currentPageIndex  = Number(event.pageIndex) + 1;
    this.fetchAllProformaInvoice(currentPageIndex,this.userId);
  }


  async uploadFile(files : FileList){
    this.file = files.item(0);
    if(this.file){
        const userId : string = this.clientDetailService.getClientId();
        const modifiedFile = Object.defineProperty(this.file, "name", {
          writable: true,
          value: this.file["name"]
        });
        modifiedFile["name"] = userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];
        this.uploadedData = await this.utilService.uploadToAppiyoDrive(this.file);
        if(this.uploadedData['uploadStatus']){
          this.documentUploadId = this.uploadedData['documentUploadId'];
          this.toasterService.showSuccess('File Upload Success','')
        }else { 
          this.toasterService.showError('File Upload Failed','')
        }
    }

  }

  onModalClose(event) {
    this.csvResponse = null;
    if (!event) {
       return;
    }

    if (event.length === 0) {
      return this.toasterService.showWarning('No valid records are available to upload', '');
    }

    this.csvUploadService.uploadValidData({currentClientId: this.userId,})
        .subscribe((response: any) => {
          const error = response.Error;
          const errorMessage = response.ErrorMessage;
          if (error !== '0') {
            return this.toasterService.showError(errorMessage, '');
          }
          const processVariables = response.ProcessVariables;
          const errorObj = processVariables.error;
          if (errorObj.code !== '0') {
             return this.toasterService.showSuccess(errorObj.message, '');
          }
          this.toasterService.showSuccess(errorObj.message, '');
          this.fetchAllProformaInvoice(1, this.userId);
        });
    console.log('event', event);

  }

getCsvDataWithValidationMessage() {
   this.csvUploadService.getCsvDataWithMessage({currentClientId: this.userId,})
    .subscribe((response: any) => {
      const error = response.Error;
      const errorMessage = response.ErrorMessage;
      if (error !== '0') {
        return this.toasterService.showError(errorMessage, '');
      }
      const processVariables = response.ProcessVariables;
      const errorObj = processVariables.error;
      // if (errorObj.code !== '0') {
      //    return this.toasterService.showSuccess(errorObj.message, '');
      // }

      console.log('processVariables', processVariables);

      this.csvResponse = {
        screenName: 'PI',
        data: processVariables.PIDataLIst
      };

      // this.toasterService.showError(errorObj.message, '');
    });
  }
}
