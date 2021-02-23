import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LabelsService } from '@services/labels.service';
import { UtilService } from '@services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToasterService } from '@services/toaster.service';
import { MatDialog } from '@angular/material';
import { SmsCreditDialogComponent } from './sms-credit-dialog/sms-credit-dialog.component';
import { InvoiceService } from '@services/invoice.service';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { SearchService } from '../../../../services/search.service';
import { ApiService } from '../../../../services/api.service';
import { ClientDetailsService } from '@services/client-details.service';
import { SmsCreditService } from '@services/sms-credit.service';
import { SmsCreditAllocation } from './sms-credit.model';
import { environment } from 'src/environments/environment.prod';
import { CsvDataService } from '@services/csv-data.service';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { UtilityService } from '@services/utility.service';
// import { CsvDataService } from '@services/csv-data.service';

@Component({
  selector: 'app-sms-credit-allocation',
  templateUrl: './sms-credit-allocation.component.html',
  styleUrls: ['./sms-credit-allocation.component.scss'],
})
export class SmsCreditAllocationComponent implements OnInit {
  statusList = [];
  labels: any = {};
  smsCreditForm: FormGroup;
  panelOpenState = false;
  displayedColumns: any[] = [
    's.no',
    'credit',
    'status',
    'reminder',
    'escalation',
    'remark',
    'Action',
  ];

  viewInfoData: any;

  currentDate: any;

  history = [];
  smsQuotaMetrix = [];
  dataSource = new MatTableDataSource<any>(this.history);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isDisabledInp = true;

  isDirty: boolean;

  showView = true;

  propertyFlag: boolean;

  user: string;

  accountName: string;
  status: string;

  searchForm: FormGroup;

  detectAuditTrialObj: any;

  remarkModal: boolean;

  showEmailModal: boolean;

  smsCredit: string;

  modalData: {
    title: string;
    request: any;
  };

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string;
  };
  userId: any;
  smsCreditList: SmsCreditAllocation[] = [];


  data : string = '';
  isWrite = true;

  constructor(
    private labelsService: LabelsService,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private toasterService: ToasterService,
    private invoiceService: InvoiceService,
    private behser: BehaviourSubjectService,
    private dialog: MatDialog,
    private searchService: SearchService,
    private apiService: ApiService,
    private clientDetailsService: ClientDetailsService,
    private smsCreditService: SmsCreditService,
    private customDateAdapter: CustomDateAdapter,
    private utilityService: UtilityService
  //  private csvDataService: CsvDataService
  ) {}

  ngOnInit() {
    const smsPage = this.utilityService.getSettingsDataList('SmsCreditAllocation');
    this.isWrite = smsPage.isWrite;
    // this.smsQuotaMetrix = this.smsCreditService.getSmsQuotaMatrix();
    this.pathLovValue();
    this.statusList = this.smsCreditService.getStatusListLov();
    this.activatedRoute.params.subscribe((value) => {
      if (!value) {
        return;
      }
      this.userId = Number(value.id);
      this.getSmsCreditList();
    });
    // this.userId = this.clientDetailsService.getClientId();
    console.log('userId>>>>in >> sms', this.userId);

    this.currentDate = this.datePipe.transform(
      new Date(),
      'MMM d, y, h:mm:ss a'
    );
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
    this.initForm();

    this.utilService.userDetails$.subscribe((val  :any) => {
        this.accountName = val.App_name || '';
    })

    if (this.userId) {
      this.getSmsCreditList();
    }

    // this.user = "";
    // this.activatedRoute.params.subscribe((value) => {
    //   this.user = value.id;
    // });

    // console.log(this.activatedRoute);
    // if (this.user) {
    //   this.utilService.userDetails$.subscribe((val) => {
    //     this.accountName = val["userId"] || "";
    //     this.status = val["status"] || "";
    //   });

    //   this.propertyFlag = true;
    // } else {
    //   this.showView = false;
    // }
  }

  initForm() {
    const userName = localStorage.getItem('userName') || '';
    this.smsCreditForm = new FormGroup({
      smsApprover: new FormControl(''),
      totalCredit: new FormControl(null),
      dateOfRequest: new FormControl(null),
      status: new FormControl('0'),
      onApprovalOf: new FormControl(null),
      remark: new FormControl(''),
      usedCredit: new FormControl(null),
      balanceCredit: new FormControl(null),
      approvedBy: new FormControl(userName),
      timeStamp: new FormControl(this.currentDate),
    });

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null),
    });
  }

  pathLovValue(){
    const data =  this.activatedRoute.parent.snapshot.data || {};
    const listOfValue = data.listOfValue || {};
    const processVariables = listOfValue.ProcessVariables;
    this.smsQuotaMetrix = processVariables.SMSApproval || [];
    this.smsCreditService.setSmsQuotaMatrix(this.smsQuotaMetrix);
  }

  onQuotaMatrixChange(event) {
    this.smsCreditForm.get('onApprovalOf').setValue(event.value);
  }

  getSmsCreditList(searchKeyword = '', fromDate: string = '', toDate = '') {
      this.smsCreditService.getCreditSmsList(
        {
          selectedClientId: this.userId,
          searchKeyword,
          fromDate,
          toDate
        }
      ).subscribe((res: any) => {
          console.log('fetch data', res);
          const error = res.Error;
          const errorMessage = res.ErrorMessage;
          if (error !== '0') {
            return this.toasterService.showWarning(errorMessage, '');
          }
          const processVariables = res.ProcessVariables;
          this.smsCreditList = (processVariables.SmsCreditList || []).map((val) => {
            const status = this.getStatusDescription(val.status);
            return {
                ...val,
                statusValue: status
            };
          });

          this.dataSource = new MatTableDataSource<any>(this.smsCreditList);
          this.dataSource.paginator = this.paginator;
      });
  }

  exportCsv() {
    this.smsCreditService.getCreditSmsList(
      {
        selectedClientId: this.userId,
        exportCsv: 'true'
      }
    ).subscribe((res: any) => {
        console.log('fetch data', res);
        const error = res.Error;
        const errorMessage = res.ErrorMessage;
        if (error !== '0') {
          return this.toasterService.showWarning(errorMessage, '');
        }
        const processVariables = res.ProcessVariables;
        const dataList = processVariables.list;
        if (!dataList) {
          return this.toasterService.showInfo('No data available for download', '');
        }
        CsvDataService.exportToCsv('SMS_Credit_Allocation.csv', dataList);
        // this.smsCreditList = (processVariables.SmsCreditList || []).map((val) => {
        //   const status = this.getStatusDescription(val.status);
        //   return {
        //       ...val,
        //       statusValue: status
        //   };
        // });

        // this.dataSource = new MatTableDataSource<any>(this.smsCreditList);
        // this.dataSource.paginator = this.paginator;
    });
  }

  getStatusDescription(key) {
    if (!key) {
      return;
    }
    const status = this.statusList.find((val) => {
      return val.key === key;
    });
    return status.value;
  }

  // editData() {
  //   this.propertyFlag = false;
  //   this.showView = false;
  // }

  // setFormValues() {
    // // this.smsCreditAllocation.patchValue({
    // //   smsQuotaMetrix: '1',
    // //   credit: '5000',
    // //   date: new Date(),
    // //   status: '2',
    // //   onApprovalOf: 'dureja.sk@nic.in',
    // //   remark: 'Status Changed',
    // //   statusChangedBy: 'Akshaya',
    // //   timeStamp: this.currentDate,
    // // })
    // this.detectAuditTrialObj = this.smsCreditForm.value;

    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();

    // const smsQuotaMetrix = this.smsQuotaMetrix.filter((val) => {
    //   return val.key == this.smsCreditForm.value.smsApprover;
    // });

    // const statusList = this.statusList.filter((val) => {
    //   return val.key == this.smsCreditForm.value.status;
    // });

    // this.viewInfoData = [
    //   {
    //     key: this.labels.smsQuotaMetrix,
    //     value: smsQuotaMetrix[0].value,
    //   },
    //   {
    //     key: this.labels.credit,
    //     value: this.smsCreditForm.value.credit,
    //   },
    //   {
    //     key: this.labels.dateOfRequest,
    //     value: `${day}/${month}/${year}`,
    //   },
    //   {
    //     key: this.labels.status,
    //     value: statusList[0].value,
    //   },
    //   {
    //     key: this.labels.onApprovalOf,
    //     value: this.smsCreditForm.value.onApprovalOf,
    //   },
    //   {
    //     key: this.labels.remark,
    //     value: "Status Changed",
    //   },
    //   {
    //     key: this.labels.statusChangedBy,
    //     value: this.smsCreditForm.value.statusChangedBy,
    //   },
    //   {
    //     key: this.labels.timeStamp,
    //     value: this.smsCreditForm.value.timeStamp,
    //   },
    // ];
  // }

  // detectFormChanges() {
  //   let iRemark = false;

  //   const formObject = this.smsCreditForm.value;

  //   const keyArr = Object.keys(formObject);

  //   const index = keyArr.findIndex((val) => {
  //     return val == "remark";
  //   });

  //   keyArr.splice(index, 1);

  //   const found = keyArr.find((element) => {
  //     return formObject[element] != this.detectAuditTrialObj[element];
  //   });

  //   if (found && formObject["remark"] == this.detectAuditTrialObj["remark"]) {
  //     iRemark = true;
  //     // this.toasterService.showError('Please enter the remark','')
  //     this.remarkModal = true;
  //     this.smsCreditForm.patchValue({
  //       remark: "",
  //     });
  //   } else {
  //     // if(!found && !iRemark) {

  //     //   this.form.patchValue({
  //     //     remark: this.detectAuditTrialObj.remark
  //     //   })
  //     // }
  //     this.detectAuditTrialObj = this.smsCreditForm.value;

  //     this.showDataSaveModal = true;
  //     this.dataValue = {
  //       title: "SMS Credit Saved Successfully",
  //       message: "Are you sure you want to proceed proforma invoice page?",
  //     };

  //     this.toasterService.showSuccess("Data Saved Successfully", "");
  //   }
  // }
  remarkOkay() {
    this.remarkModal = false;
  }

  next() {
    // this.utilService.setCurrentUrl('users/proformaInvoice');
    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val) => {
    //   pno = val || '1';
    // });
    this.router.navigate(['/users/proformaInvoice/' + this.userId]);
  }

  back() {
    this.router.navigate(['/users/billingAdmin/' + this.userId]);
    // this.utilService.setCurrentUrl('users/billingAdmin');

    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val) => {
    //   pno = val || '1';
    // });

    // if (this.user) {
    //   this.router.navigate(['/users/techAdmin/' + pno]);
    // } else {
    //   this.router.navigate(['/users/techAdmin']);
    // }
  }
  onSubmit() {
    const origin = location.origin;
    console.log('origin', origin);
    const token = localStorage.getItem('token');
    // const smsUrl = `${origin}/nic/assets/html/sms.html?id=smsId`;
    const smsUrl = `${origin}#/external/smsappove/smsId`
    if (this.smsCreditForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields', '');
      return;
    }
    const formValue  = this.smsCreditForm.value;
    console.log('formValue', formValue);
    const smsCredit: SmsCreditAllocation = {
      smsUrl,
      clientId: this.userId,
      smsApprover: formValue.smsApprover,
      dateOfRequest: this.customDateAdapter.transform(formValue.dateOfRequest, 'dd/MM/yyyy'),
      balanceCredit: formValue.totalCredit, // initially full credit is available
      status: formValue.status,
      onApprovalOf: formValue.onApprovalOf,
      remark: formValue.remark,
      approvedBy: formValue.approvedBy,
      id: 0, // for new creation
      totalCredit: formValue.totalCredit,
      usedCredit: '0', // initially used credit is zero
    };

    console.log('smsCredit', smsCredit);


    this.smsCreditService.saveOrUpdateSmsCreditDetails(smsCredit)
         .subscribe((res: any) => {
            console.log('value', res);
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            this.toasterService.showSuccess('Data Saved Successfully', '');
            this.isDirty = false
            const processVariables = res.ProcessVariables;
            const status = this.getStatusDescription(processVariables.status);
            const data: SmsCreditAllocation = {
              statusValue: status,
              status: processVariables.status,
              smsApprover: processVariables.smsApprover,
              dateOfRequest: processVariables.dateOfRequest,
              balanceCredit: String(processVariables.balanceCredit),
              onApprovalOf: processVariables.onApprovalOf,
              remark: processVariables.remark,
              approvedBy: processVariables.approvedBy,
              totalCredit: String(processVariables.totalCredit),
              usedCredit: String(processVariables.usedCredit),
              id: processVariables.id
            };
            this.smsCreditList.push(data);
            this.dataSource = new MatTableDataSource<any>(this.smsCreditList);
            this.dataSource.paginator = this.paginator;
         });
  }


  

  onSearch() {
    const searchKeyword = this.searchForm.get('searchData').value;
    const fromDate = this.searchForm.get('searchFrom').value;
    const toDate = this.searchForm.get('searchTo').value;
    this.getSmsCreditList(searchKeyword, fromDate, toDate);
    // console.log(this.searchForm.value);

    // const data = this.apiService.api.smsCreditAllocationSearch;

    // const params = {
    //   searchKeyword: this.searchForm.get('searchData').value,
    //   fromDate: this.searchForm.get('searchFrom').value,
    //   toDate: this.searchForm.get('searchTo').value,
    // };

    // this.searchService
    //   .searchProjectExecution(data, params)
    //   .subscribe((value) => {
    //     console.log('value', value);
    //     this.dataSource = new MatTableDataSource<any>(
    //       value['ProcessVariables']['smscreditlist']
    //     );
    //   });
  }

  clear() {
    this.searchForm.patchValue({
      searchData: null,
      searchFrom: null,
      searchTo: null,
    });
    this.getSmsCreditList();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  getDownloadXls() {
    const data = this.smsCreditList.map((value) => {
          const statusObj = this.statusList.find((status) => {
              return String(status.key) === String(value.status);
          });
          return {
            Total_Credit: value.totalCredit,
            Date_Of_Request: value.dateOfRequest,
            Balance_Credit: value.balanceCredit,
            Approved_By: value.approvedBy,
            Used_Credit: value.usedCredit,
            Approval_Of: value.onApprovalOf,
            Status: statusObj.value,
            Status_Changed_On: value.statusChangedOn
          };
    });
    CsvDataService.exportToCsv('SMS_CREDIT_ALLOCATION.csv', data);
    // this.utilService.getDownloadXlsFile(this.history);
  }

  detectDateKeyAction(event, type) {
    console.log(event);

    if (type === 'date') {
      this.smsCreditForm.patchValue({
        date: '',
      });
      this.toasterService.showError(
        'Please click the date icon to select date',
        ''
      );
    } else if (type === 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: '',
      });
      this.toasterService.showError(
        'Please click the from date icon to select date',
        ''
      );
    } else if (type === 'searchTo') {
      this.searchForm.patchValue({
        searchTo: '',
      });
      this.toasterService.showError(
        'Please click the to date icon to select date',
        ''
      );
    }
  }

  sendReminder(element) {
    if (element.status === '0') {
      return;
    }
    this.showEmailModal = true;
    this.data = 'Send Mail';
  }

  sendEscalation(element){
    this.showEmailModal = true;
    this.data = 'Send Escalation'
  }

  onOkay() {
    this.showEmailModal = false;
  }

  onCancel() {
    this.showEmailModal = false;
  }

  newCredit(element) {
    const dialogRef = this.dialog.open(SmsCreditDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (!result) {
        return;
      }
      const status = this.getStatusDescription(result.status);
      result.statusValue = status;
      this.updateChangedSmsCredit(result);
    });
  }

  updateChangedSmsCredit(data: SmsCreditAllocation) {
    const index = this.smsCreditList.findIndex((value) => {
          return String(value.id) === String(data.id);
    });
    this.smsCreditList[index] = data;
    this.dataSource = new MatTableDataSource<any>(this.smsCreditList);
    this.dataSource.paginator = this.paginator;
  }

  saveYes() {
    this.utilService.setCurrentUrl('users/proformaInvoice');
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) => {
      pno = val;
    });

    this.router.navigate(['/users/proformaInvoice/' + pno]);
  }

  saveCancel() {
    this.showDataSaveModal = false;
  }

  OnEdit(element) {
    this.newCredit(element);
  }
}
