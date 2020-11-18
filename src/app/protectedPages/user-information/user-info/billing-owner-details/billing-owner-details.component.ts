import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';

@Component({
  selector: 'app-billing-owner-details',
  templateUrl: './billing-owner-details.component.html',
  styleUrls: ['./billing-owner-details.component.scss']
})
export class BillingOwnerDetailsComponent implements OnInit {

  labels:any;
  billOwnerForm:FormGroup;
  isDirty: boolean;
  propertyFlag : boolean;

  countryCodeValues = [
    {key:0,value:'+91'},
    {key:1,value:'+60'},
    {key:2,value:'+65'}
  ]

  user: string;

  constructor(
    private labelsService:LabelsService,
    private toasterService:ToasterService,
    private router:Router,
    private utilService:UtilService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    this.billOwnerForm=new FormGroup({
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      countryCode: new FormControl(null),
      mobileNo :new FormControl (''),
      telPhno : new FormControl (''),
      offAddress1 : new FormControl ([null]),
      offAddress2 : new FormControl ([null]),
      offAddress3 : new FormControl ([null]),
      city : new FormControl ([null]),
      state : new FormControl ([null]),
      pinCode : new FormControl (''),
    })

    this.user = ''
    this.activatedRoute.params.subscribe((value)=> {
      this.user = value.id;
  });

  console.log(this.activatedRoute)
    if(this.user){
      this.setFormValues();
      this.propertyFlag = true;

      }



  }

  setFormValues() {

    this.billOwnerForm.patchValue({
      name : 'sasi',
      departmentName : '1',
      designation : 'chennai',
      employeeCode : '54534',
      email : 'test@gmail.com',
      countryCode: '0',
      mobileNo : '9754544445',
      telPhno : '8667756765',
      offAddress1 : 'add1',
      offAddress2 : 'add2',
      offAddress3 : 'add3',
      city : 'chennai',
      state : 'tamilnadu',
      pinCode : '600025',

    })
  }

  editData() {
    this.propertyFlag = false;
  }

  onSubmit(){
    if(this.billOwnerForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.billOwnerForm.value)
  }
  back() {

    this.utilService.setCurrentUrl('users/techAdmin')

    if(this.user) {
      this.router.navigate(['/users/techAdmin/1'])
    }else {
      this.router.navigate(['/users/techAdmin'])
    }
    
  }

  next() {
    this.utilService.setCurrentUrl('users/smsCredit')

    if(this.user) {
    this.router.navigate(['/users/smsCredit/1'])

    }else {
    this.router.navigate(['/users/smsCredit'])

    }
  }

}
