import { Component, OnInit ,ViewChild,Input, OnChanges} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { UtilService } from '../../../services/util.service';
import { Location } from '@angular/common';

import { DatePipe } from '@angular/common';

import {ToasterService} from '@services/toaster.service';

import { Router,ActivatedRoute } from '@angular/router'


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
  buttonName : any = "Save";
  propertyFlag : boolean;
  labels: any = {};
  panelOpenState = false;
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
  smsServiceReqd=[
    {key:0,value:'Prepaid'},
    {key:1,value:'Post-Paid'}
  ]

  countryCodeValues = [
    {key:0,value:'+91'},
    {key:1,value:'+60'},
    {key:2,value:'+65'}
  ]

  constructor(private formBuilder : FormBuilder,private labelsService: LabelsService, private location: Location,private datePipe : DatePipe,private utilService: UtilService,private toasterService: ToasterService,private router: Router,private activatedRoute: ActivatedRoute) {

    this.form =this.formBuilder.group({
      name : [null],
      departmentName : [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode: [null],
      mobileNo : [null],
      OfficerName:[null],
      OfficerEmail:[null],
      OfficerMobile:[null],
      telPhno : [null],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      smsServiceReqd: [''],
      creditsSMSQuota: [null],
      smsTariffMonthWise : [null],
      availableCredit: [null],
      nameOfTheApplication: [null],
      applicationUrl: [null],
      serverLocation: [null],
      purpOfTheApplication: [null],
      smsGatewayAccess: [null],
      ipServReqd: [null],
      domMonSmsTraffic: [null],
      intMonSmsTraffic: [null],
      appSecurAudClear: [null],
      auditDate:[null],
      traiSenderId: [null],
      userId: [null],
      password: [null],
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

    this.user = '';
    
    this.activatedRoute.params.subscribe((value)=> {
        this.user = value.id;
    });

    console.log(this.activatedRoute)
      if(this.user){
        this.setFormValues();
        this.buttonName = 'Edit';
        this.propertyFlag = false;

        }
         

  }

  ngOnChanges() {

    let path = this.location.path();

    if(!path.includes('customerDetails/')) {
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

    this.form.value['creditDate'] = this.datePipe.transform(this.form.value['creditDate'], 'dd/MM/yyyy')
    this.form.value['creditAddedAgainstPi'] = this.datePipe.transform(this.form.value['creditAddedAgainstPi'], 'dd/MM/yyyy')
    this.form.value['auditDate'] = this.datePipe.transform(this.form.value['auditDate'], 'dd/MM/yyyy')
    // console.log(this.fromDate)
    console.log(this.form.value)
  }

  back() {

    this.utilService.setCurrentUrl('dashboard')
    this.router.navigate(['/users/Dashboard'])
  }

  next(){

    this.utilService.setCurrentUrl('users/techAdmin')
    this.router.navigate(['/users/techAdmin'])
  }

}
