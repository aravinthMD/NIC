import { Component, Inject, OnInit,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '@services/admin.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-admin-roles-mapping-dialog',
  templateUrl: './admin-roles-mapping-dialog.component.html',
  styleUrls: ['./admin-roles-mapping-dialog.component.scss']
})
export class AdminRolesMappingDialogComponent implements OnInit {

  checked  :boolean;
  read : boolean;
  write : boolean;
  delete : boolean;
  emailEnable : boolean
  screenId : string;
  screenName : string;
  roleToFind ;

  currentDataId : string;

  emiiter = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      private adminService  : AdminService,
      private toasterService : ToasterService,
      private dialogRef: MatDialogRef<AdminRolesMappingDialogComponent>) { 
    // this.checked = this.data.isMapping;
    // this.read = this.data.isRead;
    // this.write = this.data.isWrite;
    // this.emailEnable = this.data.isEnableEmail;
    // this.screenName = this.data.screenName;
      // this.getSecurityMatrixById(this.data)
      console.log(this.data);
       this.roleToFind = this.data.roleToFind;
      this.screenId = this.data.screenId
      this.screenName = this.data.screenName
      this.getSecurityMatrixById(this.roleToFind,this.screenId)
  } 

  update(){

    const data = {

      enableRead : this.read,
      enableWrite : this.write,
      enableEmail :  this.emailEnable,
      // currentDataId : this.currentDataId,
      roleToFind : this.roleToFind,
      screenId : this.screenId,
      enableMapping : this.checked,
      temp  : 'update'
    }

    this.adminService.updateSecurityMatrix(data).subscribe(
      (response  :any) =>{
        const ProcessVariables = response.ProcessVariables || {};
        const error = ProcessVariables.error || {};
        if(error.code === '0'){
          this.toasterService.showSuccess('Data Updated Successfully','');
          this.dialogRef.close('SUCCESS');
        }else{
          this.toasterService.showError(error.message,'');
        }
    },(error) =>{
        this.toasterService.showError(error.message,'');
    })


  }

  ngOnInit() {
  }

  getSecurityMatrixById(roleToFind : string,screenId : string){

    this.adminService.getSecurityMatrixById(roleToFind,screenId).subscribe(
      (response : any) =>{
        console.log(response);
        const ProcessVariables = response.ProcessVariables || {};
        const error = ProcessVariables.error || {};
        if(error.code === '0'){
            this.emailEnable = ProcessVariables.enableEmail;
            this.write = ProcessVariables.enableWrite;
            this.read = ProcessVariables.enableRead;
            this.checked  = ProcessVariables.enableMapping;
            this.currentDataId = ProcessVariables.currentDataId;
        }else  {
            this.toasterService.showError('Failed to Fetch Data','');
        }
    },(error) => {
          this.toasterService.showError('Failed to Fetch Data','');
    })

    

  }

}
