import { Component, OnInit,ViewChild ,Input,AfterViewInit} from '@angular/core';
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
@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  
})
export class ProcessDetailsComponent implements OnInit{

  userId:string ;
  @Input('userObj') user : any;

  length: number;
  pageSize : number;
  currentPage = 1;

  storeProjectNo: string;
  displayedColumns : string[] = ['InvoiceNo','accountName','projectNumber','piAmt',"reminder","Escalation","Action"]
  piStatusData = [{key:0,value:'Received'},{key:1,value:'Approved'},{key:2,value:'Pending'},{key:3,value:'Rejected'},{key:4,value:'On Hold'}]
  paymentStatusData = [{key:0,value:'Received'},{key:1,value:'Pending'},{key:2,value:'On Hold'}]
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
    message: string
  }

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
        private clientDetailService:ClientDetailsService
        ) { 


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
      remark:['']

    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })

  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['App_name'] || '';
      this.status = val['status'] || '';
    })

    this.activatedRoute.params.subscribe((value)=> {
      this.storeProjectNo = value.projectNo || 4535;
  });
  this.userId = this.clientDetailService.getClientId();

  this.fetchAllProformaInvoice(this.currentPage,this.userId);

  }

  OnEdit(Data : any){
    const dialogRef = this.dialog.open(ProformaInvoiceDialogFormComponent,{
      data: Data.selectedPIId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.fetchAllProformaInvoice(this.currentPage,this.userId);
    });

  }

  fetchAllProformaInvoice(currentPage:any,selectedClientId :string){
      this.invoiceService.fetchAllProformaInvoice(currentPage,selectedClientId).subscribe(
        (response) => {
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

  onSubmit() {

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

  createProformaInvoice(){
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
      const Data = {
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
        uploadDocument : 'yes',
        userId : Number(userId)
      }

      this.invoiceService.createProformaInvoice(Data).subscribe(
        (response) => {
          const { 
            ProcessVariables  : { error : {
              code,
              message
            }}
          } = response;
          console.log(`API response for the Create PI :${response}`)
          if(code == '0'){
            this.form.reset();
            this.isDirty = false;
            this.toasterService.showSuccess('proforma Invoice Updated SucessFully','')
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
        searchKeyword: this.searchForm.get('searchData').value,
        fromDate: this.searchForm.get('searchFrom').value,//"2020-12-27T18:30:00.000Z",
        toDate: this.searchForm.get('searchTo').value//"2021-01-05T18:30:00.000Z"
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
    })
  }



  sendReminder(element) {
    this.showEmailModal = true;

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
      this.toasterService.showError('Please click the startDate icon to select date','');
    }else if(type == 'endDate') {

      this.form.patchValue({
        endDate: ''
      })
      this.toasterService.showError('Please click the endDate icon to select date','');
    }else if(type == 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: ''
      })
      this.toasterService.showError('Please click the fromdate icon to select date','');
    }else if(type == 'searchTo') {
      this.searchForm.patchValue({
        searchTo: ''
      })
      this.toasterService.showError('Please click the todate icon to select date','');
    }
    
  }

  next() {

    this.utilService.setCurrentUrl('users/projectExecution')

    this.router.navigate([`/users/projectExecution/${this.storeProjectNo}`])

  }

  back() {

    this.utilService.setCurrentUrl('users/smsCredit')

    this.router.navigate([`/users/smsCredit/${this.storeProjectNo}`])

  }

  getServerData(event?:PageEvent){
    let currentPageIndex  = Number(event.pageIndex) + 1;
    this.fetchAllProformaInvoice(currentPageIndex,this.userId);
  }
}
