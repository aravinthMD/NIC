import { Component, OnInit,Optional, Inject,ChangeDetectorRef,AfterViewInit } from '@angular/core';
import { LabelsService } from '../../../services/labels.service';
import { FormGroup,FormBuilder} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {ToasterService} from '@services/toaster.service';

import { AdminService } from '@services/admin.service';
import { ActivatedRoute } from '@angular/router';



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

mobileNumberCodeList   = [];

deparmentList  = [];

roleList  = []

countryCodeValues = []

teleCodeValues = []

  constructor(
    private labelsService: LabelsService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private toasterService: ToasterService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, 
    ) {

//       address1: ""
// address2: ""
// address3: ""
// city: ""
// departmentId: 1
// departmentName: "DemoTest"
// designation: ""
// email: "akshaya.venkataraman@appiyo.com"
// employeeCode: ""
// landlineNo: "0"
// mobileNoCode: null
// name: "Akshaya"
// phoneNumber: "8807050305"
// pincode: "0"
// remarks: null
// role: "Admin user"
// roleId: 1
// state: ""
// telephoneNoCode: null
// userId: "1"
// userName: "akshaya"


    this.form =this.formBuilder.group({
      name : [`${data.name || ''}`],
      departmentName : [`${data.departmentId || ''}`],
      roleName: [`${data.roleId || ''}`],
      designation : [`${data.designation || ''}`],
      employeeCode : [`${data.employeeCode || ''}`],
      countryCode: [`${data.mobileNoCode || ''}`],
      teleCode: [`${data.telephoneNoCode || ''}`],
      email : [`${data.email || ''}`],
      mobileNo : [`${data.phoneNumber || ''}`],
      telPhno : [`${data.landlineNo || ''}`],
      offAddress1 : [`${data.address1 || ''}`],
      offAddress2 : [`${data.address2 || ''}`],
      offAddress3 : [`${data.address3 || ''}`],
      city : [`${data.city || ''}`],
      state : [`${data.state || ''}`],
      pinCode : [`${data.pincode || ''}`],
      remark:[`${data.remarks || ''}`] 
    });

    this.detectAuditTrialObj = this.form.value;
   }

  //  patchLovValues(){
  //    const data  = this.activatedRoute.parent.snapshot.data || {};
  //    const listOfValue = data.listOfValue || {};
  //    const processVariables = listOfValue.ProcessVariables;
  //    this.mobileNumberCodeList = processVariables.mobileNumberCodeList || [];
  //    this.departmentListData = processVariables.departmentList || [];
  //    this.teleCodeValues = processVariables.telephoneNumberCodeList || [];
  //   }

   ngAfterViewInit() {
    this.cdr.detectChanges();
  }

   ngOnInit() {

    // this.patchLovValues();
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })
    // this.getSubLovs()
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    // const deparmentList  = this.deparmentList.filter((val)=> {
    //   return val.key == this.form.value.departmentName
    // })

    // const countryCodeValues = this.countryCodeValues.filter((val)=> {
    //   return val.key == this.form.value.countryCode
    // })
    // const teleCodeValues = this.teleCodeValues.filter((val)=> {
    //   return val.key == this.form.value.teleCode
    // })
    this.viewInfoData = [
      {
        key: this.labels.name,
        value:this.form.value.name
      },
      {
        key: 'Department',
        value:this.data.departmentName
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
        // value:`${this.data.mobileNoCode || ''}${this.form.value.mobileNo}`
        value:`91${this.form.value.mobileNo}`
      },
      {
        key: this.labels.teleNumber,
        // value:`${this.data.telephoneNoCode || ''}${this.form.value.telPhno}`
        value:`044${this.form.value.telPhno}`
      },
      {
        key: 'Official Address',
        value:`${this.form.value.offAddress1} ${this.form.value.offAddress2} ${this.form.value.offAddress3}, ${this.form.value.city}, ${this.form.value.state} - ${this.form.value.pinCode}`
      },
      {
        key: this.labels.remark,
        value:this.form.value.remark
      },
      {
        key : "",
        value :  ""
      },
      {
        key :  "",
        value :  ""
      },
      {
        key :  "",
        value : ""
      }
    ]
    
  }

  async getSubLovs() {

    let listData = []

    await this.adminService.getLovSubMenuList("0").subscribe((response)=> {


      const submenuList = response['ProcessVariables']['Lovitems'];
     submenuList.forEach(element => {
        
        listData.push({key:element.key,value:element.name})
      });
    })

    this.deparmentList = listData;


    let roleData = []

    await this.adminService.getLovSubMenuList("5").subscribe((response)=> {


      const rolesList = response['ProcessVariables']['Lovitems'];
      rolesList.forEach(element => {
        
        roleData.push({key:element.key,value:element.name})
      });
    })

    this.roleList = roleData
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

      const adminUser = {
        "name":this.form.value.name,
        "email":this.form.value.email,
        "mobileNumber":this.form.value.mobileNo,
        "designation":this.form.value.designation,
        "employeeCode":this.form.value.employeeCode,
        "id":this.data.userId,
        "temp":"update",
        "telephoneNumber":this.form.value.telPhno,
        "officialAddress1":this.form.value.offAddress1,
        "officialAddress2":this.form.value.offAddress2,
        "officialAddress3":this.form.value.offAddress3,
        "city":this.form.value.city,
        "state":this.form.value.state,
        "pinCode":this.form.value.pinCode,
        "remarks":this.form.value.remark,
        "department":this.form.value.departmentName,
        "role":this.form.value.roleName,
        "mobileCode":this.form.value.countryCode,
        "telephoneCode":this.form.value.teleCode
      }


      this.adminService.updateAdminUser(adminUser).subscribe((response)=> {

        console.log('Update response',response)

        if(response['ProcessVariables']['response']['type'] == 'Success') {

          this.toasterService.showSuccess(response['ProcessVariables']['response']['value'],'')
        }else {
          this.toasterService.showError(response['ProcessVariables']['response']['value'],'')
        }
      })

      this.detectAuditTrialObj = this.form.value;
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

}
