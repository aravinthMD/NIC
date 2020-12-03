import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup,FormBuilder} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit,AfterViewInit {

  filterTabButtonName :  string  = null

  @ViewChild(MatAccordion,{static:true}) accordion: MatAccordion;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['UserID', 'Department', 'state','projectNumber', 'piNumber','piDate']; 
  dropdownSettings : IDropdownSettings = {};


  userList : any[] = [
    {userId : "arul.auth",department : "Finance Department Uttarakhand",state : "Uttarakhand",projectNumber: '2356',status :"Active",id:1,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'4355',piDate:'12/05/2020'},
    {userId : "kumar.auth",department : "Department of School Education",state : "Delhi",projectNumber: '4532',status :"InActive",id:2,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'2313',piDate:'15/06/2020'},
    {userId : "Jain.auth",department : "Election Department , Manipur",state : "Manipur",projectNumber: '6445',status :"InActive",id:3,po:'Raised',pi:'',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6574',piDate:'08/04/2020'},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",state : "Delhi",projectNumber: '5454',status :"Active",id:3,po:'Raised',pi:'pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6789',piDate:'21/07/2020'},
    {userId : "Jain.auth",department : "revenue Department, tripura ",state : "tripura",projectNumber: '6453',status :"Active",id:3,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6743',piDate:'11/04/2020'},
    {userId : "Jain.auth",department : "Land records and settlement ",state : "delhi",projectNumber: '7554',status :"Active",id:3,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'5432',piDate:'12/06/2020'},
  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  optionValue: any[];

  options: string[] = ['arul.auth','kumar.auth','gonnade.auth','Rajesh.auth','swapnil.parab.auth','abijith.auth','ankit.auth','ketan.auth'];
  projectNoDropDownList : string[] = ['2356','4532','6445','5454','6453','7554','8857','9568'];
  departMentDropDownList :  string[] = ['Finance Department Uttarakhand','Department of School Education','Election Department','Director of emloyment and ceo','revenue Department'];
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

  

  reportsList = [{
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
    value:'ProjectNo'
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
  {"key":'1',"value" :"ALL"},
  {"key":"2","value":"Active"},
  {"key":"3","value":"InActive"}
]
  


  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      reports: [''],
      status:[''],
      reportFilter:[''],
      state:[''],
      fromDate:[null],
      toDate:[null],
      accountFilter : [''],
      projectNoFilter : [''],
      departMentFilter : [''],
      stateFilter : [''],
      userStatus : ['']
    })

   }

  ngOnInit() {

    this.dropdownSettings  = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll : true,
      clearSearchFilter : true,
      itemsShowLimit:2
    };



    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
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



  OnFilter(){

    console.log(this.form.value)

    console.log(this.myControl.value)
    this.filterTabButtonName = "Filter Applied";
    this.accordion.closeAll
  }

  onSelect(event) {

    const data = event.target.value;

    if(data == '1') {
      this.optionValue = [
        {value:'Valid',key:'1'},
        {value:'Invalid',key:'2'},
        {value:'Paid',key:'3'},
        {value:'Unpaid',key:'4'},
        {value:'PO generated ',key:'5'},
        {value:'PO not generated',key:'6'}
      ]

    }else if(data == '2') {
      this.optionValue = [
        {value:'Valid',key:'1'},
        {value:'Invalid',key:'2'},
        {value:'Invoice Raised',key:'3'},
        {value:'Not Raised',key:'4'},
        {value:'PO Claim Full',key:'5'},
        {value:'PO Claim Partially',key:'6'},
        {value:'PO need to amend',key:'7'},
        {value: 'PO need cancelled',key:'8'}
      ]

    }else if(data == '3') {
      this.optionValue = [
        {value:'Validated',key:'1'},
        {value:'Pending for Validation',key:'2'},
        {value:'on Hold',key:'3'},
        {value:'Submitted to NIICSI',key:'4'},
        {value:'Not Submitted to NICSI',key:'5'},
        {value:'Paid',key:'6'},
        {value:'Unpaid',key:'7'}
      ]

    }else if(data == '4') {
      this.optionValue = [
        {value:'Received',key:'1'},
        {value:'Pending',key:'2'}
      ]
    }else if(data == '5'){
      this.optionValue = []
    }
  }





  onRepFilter(event) {
    const data = event.target.value;

    console.log(this.myControl.value)

    if(this.myControl.value) {
      this.myControl.reset()
    }

    this.isDepartment = false;
    if(data == '1') {
      this.dropDownFlagFunc('1')
    }else if(data == '2') {
      this.dropDownFlagFunc('2')
    }else if(data == '3') {
      this.dropDownFlagFunc('3')
    }else if(data == '4') {
      this.dropDownFlagFunc('4')
     }
     this.reset();

  }

  reset(){
    this.form.controls['accountFilter'].reset();
    this.form.controls['projectNoFilter'].reset();
    this.form.controls['departMentFilter'].reset()
    this.form.controls['stateFilter'].reset();
  }

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

  formDateFunc(event) {

  }

}
