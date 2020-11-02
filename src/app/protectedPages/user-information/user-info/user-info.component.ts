import { Component, OnInit ,ViewChild,Input, OnChanges} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { UtilService } from '../../../services/util.service';
import { Location } from '@angular/common';

import { DatePipe } from '@angular/common';

import {ToasterService} from '@services/toaster.service';

import { Router } from '@angular/router'


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

  isDirty: boolean;


  // deparmentList : any[] = ['','Department of Sainik Welfare',
  //  'Minstry of minority affairs',
  //   'Vishakhapatnam port Trust' ,
  //   'minstry of trible affairs',
  //   'Bureasu of Naviks.Mumbai'];

  departmentListData = [
      {key:0,value:'Department of Sainik Welfare'},
      {key:1,value:'Minstry of minority affairs'},
      {key:2,value:'Vishakhapatnam port Trust'},
      {key:3,value:'Ministry of trible affairs'},
      {key:4,value:'Bureasu of Naviks.Mumbai'}
  ];
  

  constructor(private formBuilder : FormBuilder,private labelsService: LabelsService, private location: Location,private datePipe : DatePipe,private utilService: UtilService,private toasterService: ToasterService,private router: Router) {

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
      creditApprover : [null],
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
        this.propertyFlag = true;

        }
         

  }

  ngOnChanges() {

    let path = this.location.path();

    if(!path.includes('userInfo/')) {
      this.form.reset()
    }
  }


  setFormValues(){
    
    this.existingUserFlag = true;
    
    this.form.patchValue({
      name : 'Aravinth.auth',
      departmentName : '1',
      designation : 'Senior Engineer',
      employeeCode : '12008',
      email : 'authregister@nic.com',
      mobileNo : '8754809950',
      telPhno : '0422225007',
      offAddress1 : '235/bhandup,Mumbai',
      offAddress2 : ['235,bhandup mumbai'],
      offAddress3 : ['235,bhandup,mumbai'],
      city : 'mumbai',
      state : 'maharastra',
      pinCode : '641008',
      smsTariffMonthWise : '345377',
      piDuration : '6',
      projectNo : '8776',
      creditAdded : '1002',
      creditApprover : '235',
      fromDate: new Date(),
      toDate: new Date(),
      creditDate : new Date(),
      creditAddedAgainstPi : new Date(),
      

    })
  }

  formDateFunc(date) {
  //  const value =  this.datePipe.transform(date, 'dd-MM-yyyy');
  //   console.log('DTAE ******',value)
  }

  Onsubmit(){

    if(this.form.invalid) {
     
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')

      return
    }
    this.propertyFlag = false;
    this.buttonName = 'Update';

    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['creditDate'] = this.datePipe.transform(this.form.value['creditDate'], 'dd/MM/yyyy')
    this.form.value['creditAddedAgainstPi'] = this.datePipe.transform(this.form.value['creditAddedAgainstPi'], 'dd/MM/yyyy')
    // console.log(this.fromDate)
    console.log(this.form.value)
  }

  back() {

    this.utilService.setCurrentUrl('dashboard')
    this.router.navigate(['/users/Dashboard'])
  }

}
