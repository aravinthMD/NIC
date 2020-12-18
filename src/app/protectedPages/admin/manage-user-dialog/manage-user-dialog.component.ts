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

showUpdate: boolean;
showEdit:boolean;

viewInfoData: any;

deparmentList : any[] = [{key:0,value:'Admin User'},{key:1,value:'Operation User'},{key:2,value:'Finance User'},{key:3,value:'Sales User'}];

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

  constructor(private labelsService: LabelsService,private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toasterService: ToasterService) {


    this.form =this.formBuilder.group({
      name : [`${data.username}`],
      departmentName : ['1'],
      designation : ['Officer'],
      employeeCode : ['NIC004533'],
      countryCode: ['0'],
      teleCode: ['0'],
      email : [`${data.email}`],
      mobileNo : [`${data.mobile_no}`],
      telPhno : ['2265564'],
      offAddress1 : ['Tiruvanmaiyur'],
      offAddress2 : ['Solinganallur'],
      offAddress3 : ['Perungudi'],
      city : ['Chennai'],
      state : ['Tamilnadu'],
      pinCode : ['600026'],
      remark:['Pincode Changed'] 
    });

    this.detectAuditTrialObj = this.form.value;
   }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const deparmentList  = this.deparmentList.filter((val)=> {
      return val.key == this.form.value.departmentName
    })

    const countryCodeValues = this.countryCodeValues.filter((val)=> {
      return val.key == this.form.value.countryCode
    })
    const teleCodeValues = this.teleCodeValues.filter((val)=> {
      return val.key == this.form.value.teleCode
    })
    this.viewInfoData = [
      {
        key: this.labels.name,
        value:this.form.value.name
      },
      {
        key: 'Department',
        value:deparmentList[0].value
      },
      {
        key: this.labels.designation,
        value:this.form.value.designation
      },
      {
        key: this.labels.employeeCode,
        value:this.form.value.employeeCode
      },
      {
        key: this.labels.email,
        value:this.form.value.email
      },
      {
        key: this.labels.mobileNo,
        value:countryCodeValues[0].value+this.form.value.mobileNo
      },
      {
        key: this.labels.teleNumber,
        value:`${teleCodeValues[0].value}${this.form.value.telPhno}`
      },
      {
        key: 'Official Address',
        value:`${this.form.value.offAddress1} ${this.form.value.offAddress2} ${this.form.value.offAddress3}, ${this.form.value.city}, ${this.form.value.state} - ${this.form.value.pinCode}`
      },
      {
        key: this.labels.remark,
        value:this.form.value.remark
      }
    ]

    
  }

  OnEdit() {

    this.showUpdate = true;
    this.enableflag = false;
    this.showEdit = true;
  }


  OnUpdate(){
   
      // this.enableflag = true
      // this.buttonName = 'Edit';
      if(this.form.invalid) {
     
        this.isDirty = true;
        this.toasterService.showError('Please fill all the mandatory fields','')
  
        return
      }
      this.detectFormChanges()
    
    
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: 'returnvalue' });
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
