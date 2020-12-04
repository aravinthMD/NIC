import { Component, OnInit,Optional, Inject } from '@angular/core';
import { LabelsService } from '../../../services/labels.service';
import { FormGroup,FormBuilder} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {ToasterService} from '@services/toaster.service';



@Component({
  selector: 'app-manage-user-dialog',
  templateUrl: './manage-user-dialog.component.html',
  styleUrls: ['./manage-user-dialog.component.scss']
})
export class ManageUserDialogComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true



today: any;
form: FormGroup;
labels: any = {};

isDirty: boolean;
detectAuditTrialObj: any;

remarkModal: boolean;

deparmentList : any[] = [{key:0,value:'Admin User'},{key:1,value:'Operation user'},{key:2,value:'Finance User'}];

  constructor(private labelsService: LabelsService,private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toasterService: ToasterService) {


    this.form =this.formBuilder.group({
      name : [`${data.username}`],
      departmentName : ['1'],
      designation : ['Officer'],
      employeeCode : ['NIC004533'],
      email : [`${data.email}`],
      mobileNo : [`${data.mobile_no}`],
      telPhno : ['0446565555'],
      offAddress1 : ['Tiruvanmaiyur'],
      offAddress2 : ['Solinganallur'],
      offAddress3 : ['Perungudi'],
      city : ['Chennai'],
      state : ['Tamilnadu'],
      pinCode : ['600026'],
      remark:['Pincode changed'] 
    });

    this.detectAuditTrialObj = this.form.value;
   }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    
  }

  OnUpdate(){
    if(this.buttonName == 'Edit') {
      this.enableflag = false
      this.buttonName = 'Update';
    }else {
      // this.enableflag = true
      // this.buttonName = 'Edit';
      if(this.form.invalid) {
     
        this.isDirty = true;
        this.toasterService.showError('Please fill all the mandatory fields','')
  
        return
      }
      this.detectFormChanges()
    }
    
    
  }

  detectFormChanges() {

    let iRemark = false;

    const formObject = this.form.value;

    const keyArr = Object.keys(formObject);

    const index = keyArr.findIndex((val)=> {
      return val == 'remark'
    })
    
    keyArr.splice(index,1)

    const found = keyArr.find((element) => {
              return formObject[element] != this.detectAuditTrialObj[element]
        
    });


    if(found && formObject['remark'] == this.detectAuditTrialObj['remark']){
      iRemark = true;
    // this.toasterService.showError('Please enter the remark','')
    this.remarkModal = true;
    this.form.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }
      this.detectAuditTrialObj = this.form.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

}
