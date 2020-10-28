import { Component, OnInit ,ViewChild,Input, OnChanges} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';

import { Location } from '@angular/common';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit,OnChanges {


  // @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion; 
  @Input('userObj') user : any;

  form : FormGroup
  existingUserFlag : boolean = false;
  buttonName : any = "Submit";
  propertyFlag : boolean;
  labels: any = {};


  // deparmentList : any[] = ['','Department of Sainik Welfare',
  //  'Minstry of minority affairs',
  //   'Vishakhapatnam port Trust' ,
  //   'minstry of trible affairs',
  //   'Bureasu of Naviks.Mumbai'];

    deparmentList : any[] = [{key:'Department of Sainik Welfare',value:0},{key:'Minstry of minority affairs',value:1},{key:'Vishakhapatnam port Trust',value:2},
    {key:'minstry of trible affairs',value:2},{key:'Bureasu of Naviks.Mumbai',value:3}
  ];

  fromDate = new FormControl();
  toDate = new FormControl();
  creditDate = new FormControl();
  creditAddedAgainstPi = new FormControl();

  constructor(private formBuilder : FormBuilder,private labelsService: LabelsService, private location: Location,private datePipe : DatePipe) {

    this.form =this.formBuilder.group({
      name : [null],
      departmentName : [null],
      designation : [null],
      employeeCode : [null],
      email : [null],
      mobileNo : [null],
      telPhno : [null],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      smsTariffMonthWise : [null],
      piDuration : [null],
      projectNo : [null],
      creditAdded : [null],
      creditApproved : [null],
      creditDate : [null],
      creditAddedAgainstPi : [null],
      fromDate: [null],
      toDate: [null]      
    });

   }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

      if(this.user){
        this.setFormValues();
        this.buttonName = 'Edit';
        this.propertyFlag = true
        }

  }

  ngOnChanges() {

    let path = this.location.path();

    if(!path.includes('userInfo/')) {
      this.fromDate = new FormControl();
      this.toDate = new FormControl();
      this.creditDate = new FormControl();
      this.creditAddedAgainstPi = new FormControl();
      this.form.reset()
    }
  }


  setFormValues(){
    
    this.existingUserFlag = true;
    this.fromDate = new FormControl(new Date());
    this.toDate = new FormControl(new Date());
    this.creditDate = new FormControl(new Date());
    this.creditAddedAgainstPi = new FormControl(new Date());
    this.form.patchValue({
      name : 'Aravinth.auth',
      departmentName : this.deparmentList[1].value,
      designation : 'Senior Engineer',
      employeeCode : '12008',
      email : 'authregister@nic.com',
      mobileNo : '8754809950',
      telPhno : '0422-225007',
      offAddress1 : '235/bhandup,Mumbai',
      offAddress2 : ['235,bhandup mumbai'],
      offAddress3 : ['235,bhandup,mumbai'],
      city : 'mumbai',
      state : 'maharastra',
      pinCode : '641008',
      smsTariffMonthWise : '3453',
      piDuration : '6',
      projectNo : '8776',
      creditAdded : '1002',
      creditApproved : '235',
      creditDate : new Date(2019,10,10),
      creditAddedAgainstPi : [null],
      

    })
  }

  formDateFunc(date) {
   const value =  this.datePipe.transform(date, 'MM-dd-yyyy');
    console.log('DTAE ******',value)
  }

  Onsubmit(){
    this.propertyFlag = false;
    this.buttonName = 'Update';

    console.log(this.fromDate)
    console.log(this.form.value)
  }

}
