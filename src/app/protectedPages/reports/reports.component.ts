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


  userList : any[] = [
    {userId : "Arul.auth",department : "Finance Department Uttarakhand",state : "Uttarakhand",projectNumber: '2356',status :"Active",id:1,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'4355',piDate:'12/07/2020'},
    {userId : "Kumar.auth",department : "Department of School Education",state : "Delhi",projectNumber: '4532',status :"Inactive",id:2,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'2313',piDate:'15/06/2020'},
    {userId : "Jain.auth",department : "Election Department, Manipur",state : "Manipur",projectNumber: '6445',status :"Inactive",id:3,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6574',piDate:'08/05/2020'},
    {userId : "Jain.auth",department : "Director of Emloyment and CEO",state : "Delhi",projectNumber: '5454',status :"Active",id:3,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6789',piDate:'21/04/2020'},
    {userId : "Jain.auth",department : "Revenue Department, Tripura ",state : "Tripura",projectNumber: '6453',status :"Active",id:3,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6743',piDate:'11/03/2020'},
    {userId : "Jain.auth",department : "Land Records and Settlement ",state : "Delhi",projectNumber: '7554',status :"Active",id:3,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'5432',piDate:'12/02/2020'},
  ]

  userListPT :  any[] = [
    {userName : "arul.auth",projectNumber : "4535",invoiceNo : "4355",invoiceAmount : "3000",invoiceDate : "03/09/2020",recvDate : "08/10/2020",shortfall : "600"},
    {userName : "kumar.auth",projectNumber : "6534",invoiceNo : "2313",invoiceAmount : "5000",invoiceDate : "08/09/2020",recvDate  :"10/09/2020",shortfall  : "400"},
    {userName : "jain.auth",projectNumber : "7644",invoiceNo  : "6574",invoiceAmount : "4000",invoiceDate  : "09/09/2020",recvDate : "18/09/2020",shortfall : "300"},
  ]

  userListPR :  any[] = [
    {invoiceNo : "4355",invoiceAmount: "3000",tds : "500",deduction : "1500",actualPayment : "2000",shortPay:'1000'},
    {invoiceNo : "2313",invoiceAmount : "5000",tds : "1500",deduction  :"2000",actualPayment : "3500",shortPay:'1500'},
    {invoiceNo  : "6574",invoiceAmount  :"4000",tds : "2000",deduction  :"1200",actualPayment : "3200",shortPay:'800'}
  ]

  // userListshort :  any[] = [
  //   {docRecDate : "07/09/2020",paymentRecDate : "10/10/2020",docNo : "3432",payBMade : "cash",diff : "400",withTdS : ""},
  //   {docRecDate : "10/09/2020",paymentRecDate  : "11/10/2020",docNo  : "3450",payBMade : "cash",diff  :"300",withTdS : ""},
  //   {docRecDate : "11/10/2020",paymentRecDate  :"12/10/2020",docNo : "2356",payBMade : "cash",diff :"400",withTdS : ""}
  // ]

  userListshort :  any[] = [
    {invoiceNo : "4355",invoiceAmount: "3000",shortPay:'1000'},
    {invoiceNo : "2313",invoiceAmount : "5000",shortPay:'1500'},
    {invoiceNo  : "6574",invoiceAmount  :"4000",shortPay:'800'}
  ]


  userListpaid : any[] = [
    {
      userName : "arul.auth",
      projectNumber : "4535",
      invoiceNo : "4355",
      invoiceAmount : "3000",
      invoiceAmountPaid : "2500",
      unpaid: "500"

    },
    {
      userName : "kumar.auth",
      projectNumber : "6534",
      invoiceNo : "2313",
      invoiceAmount : "5000",
      invoiceAmountPaid : "4000",
      unpaid: "1000"

    },
    {
      userName : "jain.auth",
      projectNumber : "7644",
      invoiceNo : "6574",
      invoiceAmount : "4000",
      invoiceAmountPaid : "3200",
      unpaid: "800"

    }
  ]

  smsCreditList = [
    {
      smsQuotaApprovalMetrix: 'dureja.sk@nic.in',
      credits: "5000",
      date:'16/12/2020',
      status: 'Pending',
      projectNo :  '4535'
    },
    {
      smsQuotaApprovalMetrix: 'arpita.burman@nic.in',
      credits: "6000",
      date:'14/12/2020',
      status: 'Approved',
      projectNo  : '6534'
    },
    {
      smsQuotaApprovalMetrix: 'sshanker@nic.in',
      credits: "4000",
      date:'13/12/2020',
      status: 'Pending',
      projectNo   : '7644'
    },
    {
      smsQuotaApprovalMetrix: 'pradeep.garg@nic.in',
      credits: "3000",
      date:'12/12/2020',
      status: 'Rejected',
      projectNo  : '6454'
    }
  ]


  dataSource = new MatTableDataSource<any>(this.userList);

  optionValue: any[];

  options: string[] = ['arul.auth','kumar.auth','gonnade.auth','Rajesh.auth','swapnil.parab.auth','abijith.auth','ankit.auth','ketan.auth'];
  projectNoDropDownList : string[] = ['2356','4532','6445','5454','6453','7554','8857','9568'];
  departMentDropDownList :  string[] = ['Finance Department Uttarakhand','Department of School Education','Election Department','Director of Emloyment and CEO','Revenue Department'];
  stateDropDownList : string[] = ['TamilNadu','Kerala','AndhraPradesh','Karnataka','Mizoram','Maharastra','Gujarat','Punjab','MadhyaPradesh','NagaLand']

  

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

  reportKey: number
paymnettrackkey:any[]=[
{  PODATE:'08/12/2020',ProjectNumber:2626,From:'Raja',To:'Arvind',TotalSMS:100,Counts:65,BaseAmount:2100,Tax:15.44,InvoiceAmount:12000,Invoiceno:'65215',InvoiceDate:'07/10/2012',RecvDate:'07/10/2012',BOOK:'Booked',InvoiceSubmission:'07/10/2012',DateEstimated:'05/05/2012',InvoiceRaised:'12/05/2021',invoicestatus:'Approved',InvoiceAmount2:'15000',TDS:'15',BankReceived:'Confirm',Shortfall:'yes',InterestonTDSOtherdeduction:'nill',ReceiptDate:'14/05/2012',Month:'April',Year:'2012'
},{  PODATE:'05/2/2020',ProjectNumber:1254,From:'Arun',To:'Raja',TotalSMS:30,Counts:265,BaseAmount:55600,Tax:16.44,InvoiceAmount:62000,Invoiceno:'65262',InvoiceDate:'06/6/2061',RecvDate:'07/10/2012',BOOK:'Booked',InvoiceSubmission:'07/10/2012',DateEstimated:'05/05/2012',InvoiceRaised:'12/05/2021',invoicestatus:'Approved',InvoiceAmount2:'15000',TDS:'15',BankReceived:'Confirm',Shortfall:'yes',InterestonTDSOtherdeduction:'nill',ReceiptDate:'14/05/2012',Month:'April',Year:'2012'
}  
]

  reportsList = [{
    key : 6,
    value : "Payments Tracking"
  },{
    key : 7,
    value : "Payments Received"
  },
  {
    key : 8,
    value : "Payments Shortpay"
  },
  {
    key : 9,
    value : "Paid and Unpaid"
  },
  {
    key : 10,
    value : "SMS Credit Allocation"
  },
  {
    key: 1,
    value:'Proforma Invoice Raised'
  },
  {
    key: 2,
    value:'Purchase Order Raised'
  },
  {
    key: 3,
    value:'Invoice Raised'
  },
  {
    key: 4,
    value:'Payment Status'
  },
  {
    key: 5,
    value:'All'
  }

];

reportFilter = [
  {
    key: '1',
    value:'Account'
  },
  {
    key:'2',
    value:'Project No'
  },
  {
    key:'3',
     value:'Department'
   },
  {
    key:'4',
    value:'State'
  }
]

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



    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataList = this.userList;
  }

  initForm() {
      this.reportsForm = new FormGroup({
          reports: new FormControl(''),
          reportsFilter: new FormControl(''),
          reportsFilterDetails: new FormControl(''),
          status: new FormControl(''),
          fromDate: new FormControl(''),
          toDate: new FormControl(''),
          userStatus: new FormControl('')
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

  private _filter(value: string): string[] {

    if(value == null) {
      return []
    }
    const filterValue = (value)?value.toLowerCase():'';

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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



  OnFilter() {
    const formValue = this.reportsForm.value;
    console.log('formValue', formValue);
    // const report  = formValue.reports;
    const fromDate = this.customDateAdapter.transform(formValue.fromDate, 'dd/MM/yyyy');
    const toDate = this.customDateAdapter.transform(formValue.toDate, 'dd/MM/yyyy');
    const activeStatus = formValue.userStatus;

    const data = {
      ...formValue,
      activeStatus,
      fromDate,
      toDate,
    };

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
      return this.gridValues = res.invoiceRaisedReportList || [];
    }

   
    // if (reports === '8') {
    //   return this.gridValues = res.paidUnpaidReportList || [];
    // }


  }

  onReportChange(event) {
    const key = event.key;
    this.reportKey = Number(key);
    if ( key === '4') {
        return this.status = this.allStatus.smsCreditStatusLov;
    }
    if (key === '5') {
      return this.status = this.allStatus.piRaisedStatusLov;
    }
    if (key === '6') {
      return this.status = this.allStatus.poRaisedStatusLov;
    }
    if (key === '7') {
      return this.status = this.allStatus.invoiceRaisedStatusLov;
    }
    if (key === '8') {
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
          this.reportsFilterDetails = processVariables.reportFilterDetails || [];
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

//     const reportVal = this.form.controls['reports'].value;

//     if(reportVal >= 1 && reportVal <= 5){

//     }

//     if(reportVal == 6){
// //Paymnet Tracking
//      return this.utilService.getDownloadXlsFile(this.paymnettrackkey,'Report_Payment_Track')
      
//     }
//     if(reportVal == 7){

//       //Payment Received
    
//     }
//     if(reportVal == 8){

//       //Payment Shortpay
    
//     }
// this.utilService.getDownloadXlsFile(datatable,'Report')
  }

}
