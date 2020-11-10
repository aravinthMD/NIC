import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';

@Component({
  selector: 'app-billing-owner-details',
  templateUrl: './billing-owner-details.component.html',
  styleUrls: ['./billing-owner-details.component.scss']
})
export class BillingOwnerDetailsComponent implements OnInit {

  labels:any[];
  billOwnerForm:FormGroup;
  isDirty: boolean;

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
    this.billOwnerForm=new FormGroup({
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
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
    if(this.billOwnerForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.billOwnerForm.value)
  }
  back() {

    this.utilService.setCurrentUrl('users/techAdmin')
    this.router.navigate(['/users/techAdmin'])
  }

  next() {
    this.utilService.setCurrentUrl('users/smsCredit')
    this.router.navigate(['/users/smsCredit'])
  }

}
