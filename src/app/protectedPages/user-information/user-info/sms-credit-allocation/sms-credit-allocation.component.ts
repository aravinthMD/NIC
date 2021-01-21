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
    private smsCreditService: SmsCreditService
  ) {}

  ngOnInit() {
    this.smsQuotaMetrix = this.smsCreditService.getSmsQuotaMatrix();
    this.statusList = this.smsCreditService.getStatusListLov();
    this.userId = this.clientDetailsService.getClientId();
    console.log('userId>>>>in >> sms', this.userId);

    this.currentDate = this.datePipe.transform(
      new Date(),
      'MMM d, y, h:mm:ss a'
    );
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
    this.initForm();

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
      status: new FormControl(''),
      onApprovalOf: new FormControl(null),
      remark: new FormControl(null),
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

  getSmsCreditList() {
      this.smsCreditService.getCreditSmsList(
        {
          selectedClientId: this.userId
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

  getStatusDescription(key) {
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
    this.utilService.setCurrentUrl('users/proformaInvoice');
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) => {
      pno = val || '1';
    });
    this.router.navigate(['/users/proformaInvoice/' + pno]);
  }

  back() {
    this.utilService.setCurrentUrl('users/billingAdmin');

    let pno = '';
    this.utilService.projectNumber$.subscribe((val) => {
      pno = val || '1';
    });

    if (this.user) {
      this.router.navigate(['/users/techAdmin/' + pno]);
    } else {
      this.router.navigate(['/users/techAdmin']);
    }
  }
  onSubmit() {
    if (this.smsCreditForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields', '');
      return;
    }
    const formValue  = this.smsCreditForm.value;
    console.log('formValue', formValue);
    const smsCredit: SmsCreditAllocation = {
      clientId: this.userId,
      smsApprover: formValue.smsApprover,
      dateOfRequest: formValue.dateOfRequest,
      balanceCredit: formValue.balanceCredit,
      status: formValue.status,
      onApprovalOf: formValue.onApprovalOf,
      remark: formValue.remark,
      approvedBy: formValue.approvedBy,
      id: 0, // for new creation
      totalCredit: formValue.totalCredit,
      usedCredit: formValue.usedCredit,
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
            this.toasterService.showSuccess('Data saved successfully', '');
            const processVariables = res.ProcessVariables;
            const data: SmsCreditAllocation = {
              smsApprover: processVariables.smsApprover,
              dateOfRequest: processVariables.dateOfRequest,
              balanceCredit: String(processVariables.balanceCredit),
              status: processVariables.status,
              onApprovalOf: processVariables.onApprovalOf,
              remark: processVariables.remark,
              approvedBy: processVariables.approvedBy,
              totalCredit: String(processVariables.totalCredit),
              usedCredit: String(processVariables.usedCredit),
            };
            this.smsCreditList.push(data);
            this.dataSource = new MatTableDataSource<any>(this.smsCreditList);
            this.dataSource.paginator = this.paginator;
         });
  }

  onSearch() {
    console.log(this.searchForm.value);

    const data = this.apiService.api.smsCreditAllocationSearch;

    const params = {
      searchKeyword: this.searchForm.get('searchData').value,
      fromDate: this.searchForm.get('searchFrom').value,
      toDate: this.searchForm.get('searchTo').value,
    };

    this.searchService
      .searchProjectExecution(data, params)
      .subscribe((value) => {
        console.log('value', value);
        this.dataSource = new MatTableDataSource<any>(
          value['ProcessVariables']['smscreditlist']
        );
      });
  }

  clear() {
    this.searchForm.patchValue({
      searchData: null,
      searchFrom: null,
      searchTo: null,
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  getDownloadXls() {
    this.utilService.getDownloadXlsFile(this.history);
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
        'Please click the fromdate icon to select date',
        ''
      );
    } else if (type === 'searchTo') {
      this.searchForm.patchValue({
        searchTo: '',
      });
      this.toasterService.showError(
        'Please click the todate icon to select date',
        ''
      );
    }
  }

  sendReminder(element) {
    this.showEmailModal = true;

    this.modalData = {
      title: 'Send Reminder Email',
      request: {
        from: 'akshaya@appiyo.com',
        to: 'arul.auth@nic.in',
        subject: `Test Email: ${element.invoiceNo || 4535}`,
      },
    };
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
