import { Component, OnInit,ViewChild } from '@angular/core';

import { AdminService } from '@services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AdminRolesMappingDialogComponent } from './admin-roles-mapping-dialog/admin-roles-mapping-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-define-roles',
  templateUrl: './define-roles.component.html',
  styleUrls: ['./define-roles.component.scss']
})
export class DefineRolesComponent implements OnInit {

  dataSource = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private activatedRoute : ActivatedRoute,
    private toasterService : ToasterService
    ) { }

  rolesList: any;

  rolesControl: FormGroup;

  displayedColumns = ['ScreenName','Mapping','Modify','status','email']

  subtasks = []

  get role(){

    return this.rolesControl.controls['rolesList'].value;

  }

  set role(value){
      this.rolesList.controls['rolesList'].setValue(value);
  }


   ngOnInit() {
     
    this.initForm();
    this.pathLOVvalues();
    // let roleData = []
    // await this.adminService.getLovSubMenuList("5").subscribe((response)=> {


    //   const rolesList = response['ProcessVariables']['Lovitems'];
    //   rolesList.forEach(element => {
    //     roleData.push({key:element.key,value:element.name})
    //   });
    // })

    // this.rolesList = roleData
    this.fetchAllSecurityMetrix('1');
  }

  initForm(){
    this.rolesControl=new FormGroup({
      rolesList:new FormControl('1'),
    })

  }

  pathLOVvalues(){
      const data = this.activatedRoute.parent.snapshot.data || {};
      const listOfValues = data.listOfValue || {}
      const ProcessVariables = listOfValues.ProcessVariables || {};
      this.rolesList = ProcessVariables.rolesList || []
  }

  onChangeRole(event) {
      let roleTOFind = event.target.value;
      this.fetchAllSecurityMetrix(roleTOFind);
  }

  enableMode() {

    this.subtasks = [  {
      name: 'read'
    },
    {
      name: 'write'
    },
    {
      name: 'delete'
    }]
  }


  edit(Data){

   const dialogRef =  this.dialog.open(AdminRolesMappingDialogComponent,{
      width : '500px',
      height  :'400px',
      data  : {
                screenName : Data.ScreenName,
                screenId  :  Data.screenId,
                roleToFind  : this.role
                }
    });

      dialogRef.afterClosed().subscribe((result) =>{  
        if(result == 'SUCCESS'){
          this.fetchAllSecurityMetrix(this.role);
        }
      } )

    // dialogRef.componentInstance.emiiter.subscribe((resValue : any) => {

    //   if(!resValue)
    //   return

    //   const data = {

    //     enableMapping : resValue.isMapping,
    //     enableRead : resValue.isRead,
    //     enableWrite : resValue.isWrite,
    //     enableEmail : resValue.isEnableEmail,
    //     currentDataId : Data.id,
    //     temp : 'update',
    //     screenName  :resValue.screenName
    //   }

    //   this.adminService.updateSecurityMatrix(data).subscribe(
    //     (response) =>{
    //       console.log("")
    //   })

    // })




  }


  fetchAllSecurityMetrix(roleTOFind){

    this.adminService.getAllSecurityMatrix(roleTOFind).subscribe(
      (response : any) =>{
          console.log(response);


          const ProcessVariables = response.ProcessVariables || {};
          const error = ProcessVariables.error || {}
          if(error.code === '0'){
            const settingsDataList = ProcessVariables.settingsDataList || [];
            this.dataSource = settingsDataList;
          }else{
            this.toasterService.showError(error.message,'')
          }
    },(error) =>{
        console.log(error.message);
        this.toasterService.showError('Failed to Fetch Data','');
    })

  }

  submitData() {
    
  }

}
