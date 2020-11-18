import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';

@Component({
  selector: 'app-technical-admin-details',
  templateUrl: './technical-admin-details.component.html',
  styleUrls: ['./technical-admin-details.component.scss']
})
export class TechnicalAdminDetailsComponent implements OnInit {

 
  labels:any ;
  technicaladminform:FormGroup;
  isDirty: boolean;
  propertyFlag : boolean;

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Minstry of minority affairs'},
    {key:2,value:'Vishakhapatnam port Trust'},
    {key:3,value:'Ministry of trible affairs'},
    {key:4,value:'Bureasu of Naviks.Mumbai'}
];

countryCodeValues = [
  {key:0,value:'+91'},
  {key:1,value:'+60'},
  {key:2,value:'+65'}
]

  constructor(
    private labelsService:LabelsService,
    private toasterService:ToasterService,
    private router:Router,
    private utilService:UtilService
    ) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    this.technicaladminform=new FormGroup({
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      countryCode : new FormControl(null),
      mobileNo :new FormControl (''),
      telPhno : new FormControl (''),
      offAddress1 : new FormControl ([null]),
      offAddress2 : new FormControl ([null]),
      offAddress3 : new FormControl ([null]),
      city : new FormControl ([null]),
      state : new FormControl ([null]),
      pinCode : new FormControl (''),
    })
  }
  onSubmit(){
    if(this.technicaladminform.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.technicaladminform.value)
  
  }
  back() {

    this.utilService.setCurrentUrl('users/customerDetails')
    this.router.navigate(['/users/customerDetails'])
  }

  next() {
    this.utilService.setCurrentUrl('users/billingAdmin')
    this.router.navigate(['/users/billingAdmin'])
  }
}
