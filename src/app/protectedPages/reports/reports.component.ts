import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit,AfterViewInit {

  filterTabButtonName :  string  = null

  @ViewChild(MatAccordion,{static:true}) accordion: MatAccordion;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['UserID', 'Department', 'state', 'piNumber','piDate']; 

  userList : any[] = [
    {userId : "arul.auth",department : "Finance Department Uttarakhand",state : "Uttarakhand",status :"Active",id:1,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'4355',piDate:'12/05/2020'},
    {userId : "kumar.auth",department : "Department of School Education",state : "Delhi",status :"InActive",id:2,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'2313',piDate:'15/06/2020'},
    {userId : "Jain.auth",department : "Election Department , Manipur",state : "Manipur",status :"InActive",id:3,po:'Raised',pi:'',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6574',piDate:'08/04/2020'},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",state : "Delhi",status :"Active",id:3,po:'Raised',pi:'pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6789',piDate:'21/07/2020'},
    {userId : "Jain.auth",department : "revenue Department, tripura ",state : "tripura",status :"Active",id:3,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'6743',piDate:'11/04/2020'},
    {userId : "Jain.auth",department : "Land records and settlement ",state : "delhi",status :"Active",id:3,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved',piNumber:'5432',piDate:'12/06/2020'},
  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  optionValue: any[];

  options: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  placeholderData: string = 'Please filter data...';

  states: any[];

  isDepartment: boolean;
  


  constructor() { }

  ngOnInit() {

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



  OnFilter(){
    this.filterTabButtonName = "Filter Applied";
    this.accordion.closeAll
  }

  onSelect(event) {

    const data = event.target.value;

    if(data == '1') {
      this.optionValue = [
        {key:'Valid',value:'1'},
        {key:'Invalid',value:'2'},
        {key:'Paid',value:'3'},
        {key:'Unpaid',value:'4'},
        {key:'PO generated ',value:'5'},
        {key:'PO not generated',value:'6'}
      ]

    }else if(data == '2') {
      this.optionValue = [
        {key:'Valid',value:'1'},
        {key:'Invalid',value:'2'},
        {key:'Invoice Raised',value:'3'},
        {key:'Not Raised',value:'4'},
        {key:'PO Claim Full',value:'5'},
        {key:'PO Claim Partially',value:'6'},
        {key:'PO need to amend',value:'7'},
        {key: 'PO need cancelled',value:'8'}
      ]

    }else if(data == '3') {
      this.optionValue = [
        {key:'Validated',value:'1'},
        {key:'Pending for Validation',value:'2'},
        {key:'on Hold',value:'3'},
        {key:'Submitted to NIICSI',value:'4'},
        {key:'Not Submitted to NICSI',value:'5'},
        {key:'Paid',value:'6'},
        {key:'Unpaid',value:'7'}
      ]

    }else if(data == '4') {
      this.optionValue = [
        {key:'Received',value:'1'},
        {key:'Pending',value:'2'}
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

      this.placeholderData = 'Please Filter User Id...'

      this.options = ['arul.auth','kumar.auth','Jain.auth'];
    }else if(data == '2') {
      this.isDepartment = true;
      this.states = [{
        key:'Uttarakhand',
        value:'1'
      },
      {
        key:'Delhi',
        value:'1'
      },
      {
        key:'Manipur',
        value:'1'
      },
      {
        key:'Tripura',
        value:'1'
      }]


      this.placeholderData = 'Please Filter Department...'

      this.options = ['Finance Department Uttarakhand','Department of School Education','	Election Department , Manipur','Director of emloyment and ceo','revenue Department, tripura']
    }else if(data == '3') {
      
      this.placeholderData = 'Please Filter Status...'

      this.options = ['Active','Inactive']
    }

  }

}
