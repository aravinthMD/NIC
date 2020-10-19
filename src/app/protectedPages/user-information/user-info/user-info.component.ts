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
  existingUserFlag : boolean = false;;

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
    if(this.user)
    this.setFormValues();
  }


  setFormValues(){
    debugger
    this.existingUserFlag = true;
    this.form.patchValue({
      name : 'Aravinth.auth',
      departmentName : [null],
      designation : 'Senior Engineer',
      employeeCode : '12008',
      email : 'authregister@nic.com',
      mobileNo : '8754809950',
      telPhno : '0422-225007',
      offAddress1 : 'sdssdsf',
      offAddress2 : [null],
      offAddress3 : [null],
      city : 'mumbai',
      state : 'maharastra',
      pinCode : '641008',
      smsTariffMonthWise : '3453',
      piDuration : null,
      projectNo : '8776',
      creditAdded : '1002',
      creditApproved : '222',
      creditDate : [null],
      creditAddedAgainstPi : [null],
      

    })
  }

}
