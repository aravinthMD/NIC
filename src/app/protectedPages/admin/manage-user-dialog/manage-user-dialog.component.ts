import { Component, OnInit,Optional, Inject } from '@angular/core';
import { LabelsService } from '../../../services/labels.service';
import { FormGroup,FormBuilder} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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

deparmentList : any[] = [{key:0,value:'Admin User'},{key:1,value:'Operation user'},{key:2,value:'Finance User'}];

  constructor(private labelsService: LabelsService,private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {


    this.form =this.formBuilder.group({
      name : [`${data.username}`],
      departmentName : ['1'],
      designation : ['desigation'],
      employeeCode : ['NIC004533'],
      email : [`${data.email}`],
      mobileNo : ['9867666444'],
      telPhno : ['0446565555'],
      offAddress1 : ['tiruvanmaiyur'],
      offAddress2 : ['solinganallur'],
      offAddress3 : ['perungudi'],
      city : ['chennai'],
      state : ['tamilnadu'],
      pinCode : ['600026']
    });
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
      this.enableflag = true
      this.buttonName = 'Edit';
    }
    
    
  }

}
