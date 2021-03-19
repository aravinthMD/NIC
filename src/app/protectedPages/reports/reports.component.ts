import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { ReportsService } from '@services/reports.service';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { SmsCreditService } from '@services/sms-credit.service';
import { CsvDataService } from '@services/csv-data.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  id :  number = 1;
  dataList : any[] = [];

  filterTabButtonName :  string  = null

  @ViewChild(MatAccordion,{static:true}) accordion: MatAccordion;



  dropdownSettings : IDropdownSettings = {};



  dataSource = new MatTableDataSource<any>([]);

  optionValue: any[];


  

 accountFilterFlag : boolean;
 projectNoFilterFlag :boolean; 
 departMentFilterFlag :  boolean;
 stateFilterFlag : boolean;



  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  fromDate = new FormControl();
  toDate = new FormControl();
  placeholderData: string = 'Please filter data...';

  states: any[];

  isDepartment: boolean;

  form: FormGroup;

  reportKey: number;



userStatus  = [
  {key:'2',value :'All'},
  {key:'1',value:'Active'},
  {key:'0',value:'Inactive'}
];


  reportsForm: FormGroup;
  reportsLov = [];
  reportFilterLov = [];
  reportDisplayName: string;
  reportsFilterDetails = [];
  selectedReport: string;
  gridValues = [];
  reportsId: string;
  status = [];
  allStatus: {
    smsCreditStatusLov: any[],
    piRaisedStatusLov: any[],
    poRaisedStatusLov: any[],
    invoiceRaisedStatusLov: any[],
    paymentStatusLov: any[]
  };
  smsQuotaApprovalMatrix = [];
  smsCreditStatus = [];
  totalRecords: number;


  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private toasterService: ToasterService,
    private reportsService: ReportsService,
    private customDateAdapter: CustomDateAdapter,
    private smsCreditService: SmsCreditService) {

    // this.form = this.formBuilder.group({
    //   reports: [''],
    //   status:[''],
    //   reportFilter:[''],
    //   state:[''],
    //   fromDate:[null],
    //   toDate:[null],
    //   accountFilter : [''],
    //   projectNoFilter : [''],
    //   departMentFilter : [''],
    //   stateFilter : [''],
    //   userStatus : ['']
    // })

   }

  ngOnInit() {
    this.smsQuotaApprovalMatrix = this.smsCreditService.getSmsQuotaMatrix();
    this.smsCreditStatus = this.smsCreditService.getStatusListLov();
    this.initForm();
    this.fetchReportsLov();

    this.dropdownSettings  = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      enableCheckAll : true,
      clearSearchFilter : true,
      itemsShowLimit:2
    };





    // this.dataList = this.userList;
  }

  initForm() {
      this.reportsForm = new FormGroup({
          reports: new FormControl(''),
          reportsFilter: new FormControl(''),
          reportsFilterDetails: new FormControl(''),
          status: new FormControl(''),
          fromDate: new FormControl(''),
          toDate: new FormControl(''),
          // userStatus: new FormControl('')
      });
  }

  fetchReportsLov() {

    this.reportsService.getReportsLov()
        .subscribe((res: any) => {
            console.log('reports lov', res);
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            const processVariables = res.ProcessVariables;
            this.allStatus = {
              invoiceRaisedStatusLov: processVariables.invoiceRaisedStatusLov,
              paymentStatusLov: processVariables.paymentStatusLov,
              piRaisedStatusLov: processVariables.piRaisedStatusLov,
              poRaisedStatusLov: processVariables.poRaisedStatusLov,
              smsCreditStatusLov: processVariables.smsCreditStatusLov
            };
            this.reportsLov = processVariables.reportsLov || [];
            this.reportFilterLov = processVariables.reportFilterLov || [];
        });

  }



  onSelectAll(id ?: any){
    if(id == '1'){
      this.projectNoFilterFlag = true;
    this.departMentFilterFlag = true;
    this.stateFilterFlag = true;
    }
    if(id == '2'){
      this.departMentFilterFlag = true;
    this.stateFilterFlag = true;
    }
    if(id == '3'){
    this.stateFilterFlag = true;
    }
  }


  onPageChange(value) {
    console.log('on page', value);
    const currentPage = value.pageIndex;
    this.OnFilter(currentPage);
  }

  OnFilter(currentPage?: number) {
    const formValue = this.reportsForm.value;
    console.log('formValue', formValue);
    // const report  = formValue.reports;
    const fromDate = this.customDateAdapter.transform(formValue.fromDate, 'dd/MM/yyyy');
    const toDate = this.customDateAdapter.transform(formValue.toDate, 'dd/MM/yyyy');
    // const activeStatus = formValue.userStatus;

    const data = {
      ...formValue,
      // activeStatus,
      fromDate,
      toDate,
    };

    if (this.selectedReport === '4') {
      const status = formValue.reportsFilterDetails;
      data.activeStatus = (status[0] || {}).key || '';
      data.reportsFilterDetails = null;
    } else {
      const status = formValue.reportsFilterDetails || [];
      data.reportsFilterDetails = status.map(val => val.key)
    }

    // if (this.selectedReport === '4') {
      
      
   // }
    if (currentPage) {
      data.currentPage = currentPage;
    }

    console.log('data', data);


    this.reportsService.getReportsGridValue(data)
        .subscribe((res: any) => {
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            const processVariables = res.ProcessVariables;
            console.log('processVariables', processVariables);
            // this.totalRecords = processVariables.totalPages || 50 ;
            // return;
            this.setGridValues(processVariables);
            if (this.gridValues.length === 0) {
              return this.toasterService.showInfo('No records to display', '');
            }
        });

    // const reportVal = this.form.controls['reports'].value;

    // if(reportVal >= 1 && reportVal <= 5){
    //   this.dataList = this.userList;
    //   this.id = Number(reportVal);
    // }
    // if(reportVal == 6){
    //   this.id = Number(reportVal);
    //   this.dataList = this.userListPT
    // }
    // if(reportVal == 7){
    //   this.id = Number(reportVal)
    //   this.dataList = this.userListPR
    // }
    // if(reportVal == 8){
    //   this.id = Number(reportVal)
    //   this.dataList = this.userListshort;
    // }

    // if(reportVal == 9){
    //   this.id = Number(reportVal)
    //   this.dataList = this.userListpaid;
    // }

    // if(reportVal == 10){
    //   this.id = Number(reportVal)
    //   this.dataList = this.smsCreditList;
    // }


    // console.log(this.form.value)

    // console.log(this.myControl.value)
    // this.filterTabButtonName = "Filter Applied";
    // this.accordion.closeAll()
  }

  clearForm() {
    this.reportsForm.reset();
  }

  setGridValues(res: any) {
    const reports = this.reportsForm.get('reports').value;
    this.reportsId = reports;
    if (reports === '0') {
      const data = res.paymentsTrackingReportList || [];
      this.totalRecords = data.length;
      return this.gridValues = res.paymentsTrackingReportList || [];
    }
    if (reports === '1') {
      return this.gridValues = res.paymentReceivedReportList || [];
    }
    if (reports === '2') {
      return this.gridValues = res.paymentsShortPayReportList || [];
    }
    if (reports === '3') {
      return this.gridValues = res.paidUnpaidReportList || [];
    }
    if (reports === '4') {
      const values = (res.smsCreditAllocationReportList || []).map((value) => {
          return {
            ...value,
            SMSQuotaApprovalMatrix: value.onApprovalOf,
            status: (this.smsCreditStatus.find(sms => sms.key === value.status) || {}).value
          };
      });
      return this.gridValues = values || [];
    }
    if (reports === '5') {
      return this.gridValues = res.piRaisedReportList || [];
    }
    if (reports === '6') {
      return this.gridValues = res.poRaisedReportList || [];
    }
    if (reports === '7') {
      const data = res.invoiceRaisedReportList || [];
      this.totalRecords = data.length;
      return this.gridValues = data;
    }
    if (reports === '9') {
      this.totalRecords = res.totalPages;
      return this.gridValues = this.setValueForAllReports(res.allCategoryRptList) || [];
    }


    // if (reports === '8') {
    //   return this.gridValues = res.paidUnpaidReportList || [];
    // }


  }


  setValueForAllReports(value = []) {
    return value.map((data) => {
      return {
        department: data.clientDepartment,
        projectNumber: data.clientProjNo,
        state: data.clientState,
        userId: data.clientUserId,
        ...data
      };
    });
  }

  onReportChange(event) {
    const key = event.key;
    this.reportKey = Number(key);
    if ( key == '4') {
        return this.status = this.allStatus.smsCreditStatusLov;
    }
    if (key == '5') {
      return this.status = this.allStatus.piRaisedStatusLov;
    }
    if (key == '6') {
      return this.status = this.allStatus.poRaisedStatusLov;
    }
    if (key == '7') {
      return this.status = this.allStatus.invoiceRaisedStatusLov;
    }
    if (key == '8') {
      return this.status = this.allStatus.paymentStatusLov;
    }

    // const data = event.target.value;
    // this.reportKey = Number(data);
    // if(data == '1') {
    //   this.optionValue = [
    //     {value:'Valid',key:'1'},
    //     {value:'Invalid',key:'2'},
    //     {value:'Paid',key:'3'},
    //     {value:'Unpaid',key:'4'},
    //     {value:'PO generated ',key:'5'},
    //     {value:'PO not generated',key:'6'}
    //   ]

    // }else if(data == '2') {
    //   this.optionValue = [
    //     {value:'Valid',key:'1'},
    //     {value:'Invalid',key:'2'},
    //     {value:'Invoice Raised',key:'3'},
    //     {value:'Not Raised',key:'4'},
    //     {value:'PO Claim Full',key:'5'},
    //     {value:'PO Claim Partially',key:'6'},
    //     {value:'PO Need to Amend',key:'7'},
    //     {value:'PO Need Cancelled',key:'8'}
    //   ]

    // }else if(data == '3') {
    //   this.optionValue = [
    //     {value:'Validated',key:'1'},
    //     {value:'Pending for Validation',key:'2'},
    //     {value:'On Hold',key:'3'},
    //     {value:'Submitted to NIICSI',key:'4'},
    //     {value:'Not Submitted to NICSI',key:'5'},
    //     {value:'Paid',key:'6'},
    //     {value:'Unpaid',key:'7'}
    //   ]

    // }else if(data == '4') {

    //   this.optionValue = [
    //     {value:'Received',key:'1'},
    //     {value:'Pending',key:'2'}
    //   ]
    // }else if(data == '10') {
    //   this.optionValue = [
    //     {value:'Approved',key:'1'},
    //     {value:'Rejected',key:'2'},
    //     {value:'Pending',key:'3'}
    //   ]
    // }else if(data == '5'){
    //   this.optionValue = [];
    // }else if(data == '6'){
    //   this.optionValue = [];
    // }else if(data == '7'){
    //   this.optionValue = [];
    // }else if(data == '8'){
    //   this.optionValue = [];
    // }
  }



onReportFilterChange(event) {
  console.log('filter change', event.target.value);
  this.reportsForm.get('reportsFilterDetails').setValue('');
  const selectedReportValue = event.target.value;
  this.selectedReport = selectedReportValue;
  if (selectedReportValue === '') {
    this.reportsFilterDetails = null;
    this.reportDisplayName = '';
    return;
  }
  if (selectedReportValue === '0') {
    this.reportDisplayName = 'Account Name';
  } else if (selectedReportValue === '1') {
    this.reportDisplayName = 'Project Number';
  } else if (selectedReportValue === '2') {
    this.reportDisplayName = 'Department';
  } else if (selectedReportValue === '3') {
    this.reportDisplayName = 'State';
  } else if (selectedReportValue === '4') {
    this.reportDisplayName = 'User Status';
  }
  this.reportsService.getReportsLov({selectedReportValue})
      .subscribe((res: any) => {
          console.log('filter details', res);
          const error = res.Error;
          const errorMessage = res.ErrorMessage;
          if (error !== '0') {
            return this.toasterService.showError(errorMessage, '');
          }
          const processVariables = res.ProcessVariables;
          // 
          this.dropdownSettings = {
            allowSearchFilter: true,
            enableCheckAll : true,
            clearSearchFilter : true,
            itemsShowLimit:2,
            idField: 'key',
            textField: 'value'
          }
          if (selectedReportValue == '4') { 
              this.dropdownSettings.singleSelection = true;
              return this.reportsFilterDetails = processVariables.statusLov;
          } else {
            this.dropdownSettings.singleSelection = false;
            return this.reportsFilterDetails = processVariables.reportFilterDetails; 
          }
            
           
            //  processVariables.statusLov;
          // }
          // this.dropdownSettings = {
          //   singleSelection: false,
          //   selectAllText: 'Select All',
          //   unSelectAllText: 'Unselect All',
          //   allowSearchFilter: true,
          //   enableCheckAll : true,
          //   clearSearchFilter : true,
          //   itemsShowLimit:2
          // }
          // this.reportsFilterDetails = processVariables.reportFilterDetails || [];
      });
}

  // onRepFilter(event) {
  //   const data = event.target.value;

  //   console.log(this.myControl.value)

  //   if(this.myControl.value) {
  //     this.myControl.reset()
  //   }

  //   this.isDepartment = false;
  //   if(data == '1') {
  //     this.dropDownFlagFunc('1')
  //   }else if(data == '2') {
  //     this.dropDownFlagFunc('2')
  //   }else if(data == '3') {
  //     this.dropDownFlagFunc('3')
  //   }else if(data == '4') {
  //     this.dropDownFlagFunc('4')
  //    }
  //    this.reset();

  // }

  // reset(){
  //   this.form.controls['accountFilter'].reset();
  //   this.form.controls['projectNoFilter'].reset();
  //   this.form.controls['departMentFilter'].reset()
  //   this.form.controls['stateFilter'].reset();
  // }

  dropDownFlagFunc(id ? :string){
    this.accountFilterFlag = id === '1' ? true : false;
    this.projectNoFilterFlag = id === '2' ? true : false;
    this.departMentFilterFlag = id === '3' ? true : false;
    this.stateFilterFlag = id === '4' ? true : false
  }


  onItemDeSelect(id ? : string){
    const filter = this.form.controls['reportFilter'].value
    if(id == '2' && filter == '2'){
      this.departMentFilterFlag = false;
      this.form.controls['departMentFilter'].reset();
      this.stateFilterFlag = false;
      this.form.controls['stateFilterFlag'].reset();
    }

    if(id == '1' && filter == '1'){
      this.projectNoFilterFlag = false;
      this.form.controls['projectNoFilter'].reset();
      this.departMentFilterFlag = false;
      this.form.controls['departMentFilter'].reset();
      this.stateFilterFlag = false;
      this.form.controls['stateFilter'].reset();
    }

    if(id == '3' && filter == '3'){
      this.stateFilterFlag  = false;
      this.form.controls['stateFilter'].reset();
      
    }
  }

  detectDateKeyAction(event,type) {

    console.log(event)
  
    if(type == 'fromDate') {

      this.form.patchValue({
        fromDate: ''
      })
      this.toasterService.showError('Please click the from date icon to select date','');
    }else if(type == 'toDate') {
      this.form.patchValue({
        toDate: ''
      })
      this.toasterService.showError('Please click the to date icon to select date','');
    }
    
  }

  exportCSV() {
    const formValue = this.reportsForm.value;
    const fromDate = this.customDateAdapter.transform(formValue.fromDate, 'dd/MM/yyyy');
    const toDate = this.customDateAdapter.transform(formValue.toDate, 'dd/MM/yyyy');
    // const activeStatus = formValue.userStatus;
    const data = {
      ...formValue,
      fromDate,
      toDate,
      exportCsv: 'true'
    };

    console.log('data', data);

    const responseKey = `list_${formValue.reports}`;


    this.reportsService.getReportsGridValue(data)
        .subscribe((res: any) => {
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            const processVariables = res.ProcessVariables;
            const csvData = processVariables[responseKey];
            if(!csvData) {
                return this.toasterService.showError('No records available', '');
            }
            console.log('processVariables', processVariables);
            CsvDataService.exportToCsv('Reports.csv', csvData);
        });
  }

}
