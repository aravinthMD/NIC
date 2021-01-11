import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LabelsService} from '../../../services/labels.service'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-info-preview-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss']
})
export class UserInfoFormComponent implements OnInit {

  @Input() accountName ;
  @Input() status;
  @Input() user; 
  @Output('edit') edit = new EventEmitter<string>();
  formData    = {}


  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Ministry of Minority Affairs'},
    {key:2,value:'Visakhapatnam Port Trust'},
    {key:3,value:'Ministry of Tribal Affairs'},
    {key:4,value:'Bureau of Naviks Mumbai'}
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

teleCodeValues = [
  {key:0,value:'+044'},
  {key:1,value:'+040'},
  {key:2,value:'+080'}
]


statusList= [
  {
    key:0,value: 'Active',
  },
  {
    key:1,value:'Inactive'
  }
]

  form : FormGroup;

  labels: any = {};

  userData: any;

  constructor(private labelService :LabelsService,private formBuilder :  FormBuilder,private datePipe : DatePipe) {

    this.form =this.formBuilder.group({
      applicantName : [null],
      departmentName : ['1'],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode: [null],
      mobileNo : [null],
      OfficerName:[null],
      OfficerEmail:[null],
      OfficerMobile:[null],
      telPhno : [null],
      teleCode: [null],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      smsServiceReqd: [''],
      creditsSMSQuota: [null,Validators.pattern("^[0-9]{0,12}$")],
      smsTariffMonthWise : [null,Validators.pattern("^[0-9]{0,12}$")],
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
      traiSenderId: [''],
      userId: [null],
      password: [null],
      piDuration : [null],
      projectNo : [null,Validators.pattern("^[0-9]{0,15}$")],
      creditAdded : [null],
      creditApprover : [null],
      creditDate : [null],
      creditAddedAgainstPi : [null],
      fromDate: [null],
      toDate: [null],
      status:[null],
      remark:[null]  ,
      document : ['']

    });

   }

  ngOnInit() {
    this.labelService.getLabelsData().subscribe((values) => {
        this.labels = values
    })

    this.setFormValues();

  }


  setFormValues(){

    var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

    this.form.patchValue({
      applicantName : this.accountName.split('.')[0] || 'Arul',
      departmentName : 'Ministry of Minority Affairs',
      designation : 'Senior Engineer',
      employeeCode : '12008',
      email : 'authregister@nic.com',
      mobileNo : '8754809950',
      telPhno : '2281756',
      teleCode: '+044',
      offAddress1 : '23, Bhandup Bhairavi Voras Lab West',
      offAddress2 : '23, Bhandup West, Mumbai,Maharastra - 641008',
      offAddress3 : '23, Bhandup West, Mumbai,Maharastra - 641008',
      city : 'Mumbai',
      state : 'Maharastra',
      pinCode : '641008',
      smsTariffMonthWise : '1000',
      piDuration : '6',
      projectNo : this.user || '8776',
      creditAdded : '1000',
      creditApprover : 'Vikash',
      fromDate: day+'/'+month+'/'+year,
      toDate: day+'/'+month+'/'+year,
      creditDate : day+'/'+month+'/'+year,
      creditAddedAgainstPi : day+'/'+month+'/'+year,
      countryCode: '91',
      
      OfficerName:'Sri Ram',
      OfficerEmail:'sriram@gmail.com',
      OfficerMobile:'9768674555',
     
      smsServiceReqd: 'Post-Paid', //1
      creditsSMSQuota: '4000',
      document : 'Invoice.pdf',
     
      availableCredit: '3000',
      nameOfTheApplication: 'Sathish',
      applicationUrl: 'www.applicant.com',
      serverLocation: 'Chennai',
      purpOfTheApplication: 'Test application',
      smsGatewayAccess: '175.43.34.344',
      ipServReqd: '192.168.1.101',
      domMonSmsTraffic: '1000',
      intMonSmsTraffic: '1000',
      appSecurAudClear: 'Secure',
      auditDate:day+'/'+month+'/'+year,
      traiSenderId: 'No',
      userId: this.accountName || 'Arul.auth',
      password: 'nic@123',
      status:  'Active' , //(this.status == 'Active')?'0':'1',
      remark:'Officer Name Changed',
      
      

    })

    this.userData = this.form.value;
  }

  OnEdit(){
    this.edit.emit("edit");
  }

}
