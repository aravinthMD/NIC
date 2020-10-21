import { Component, OnInit ,ViewChild,Input} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {


  // @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion; 
  @Input('userObj') user : any;

  form : FormGroup
  existingUserFlag : boolean = false;
  buttonName : any = "Submit";
  propertyFlag : boolean;


  // deparmentList : any[] = ['','Department of Sainik Welfare',
  //  'Minstry of minority affairs',
  //   'Vishakhapatnam port Trust' ,
  //   'minstry of trible affairs',
  //   'Bureasu of Naviks.Mumbai'];

    deparmentList : any[] = [{key:'Department of Sainik Welfare',value:0},{key:'Minstry of minority affairs',value:1},{key:'Vishakhapatnam port Trust',value:2},
    {key:'minstry of trible affairs',value:2},{key:'Bureasu of Naviks.Mumbai',value:3}
  ];

  constructor(private formBuilder : FormBuilder) {

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
      
    });

   }

  ngOnInit() {
    if(this.user){
    this.setFormValues();
    this.buttonName = 'Edit';
    this.propertyFlag = true
    }

  }


  setFormValues(){
    
    this.existingUserFlag = true;
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

  Onsubmit(){
    this.propertyFlag = false;
    this.buttonName = 'Update';
  }

}
