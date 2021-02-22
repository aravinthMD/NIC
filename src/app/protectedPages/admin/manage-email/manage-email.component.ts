import { Component, OnInit } from '@angular/core';
import { AdminDetailServiceService } from '@services/admin-detail-service.service';
import { AdminService } from '@services/admin.service';
import { ClientDetailsService } from '@services/client-details.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'manage-email',
  templateUrl: './manage-email.component.html',
  styleUrls: ['./manage-email.component.scss']
})
export class ManageEmailComponent implements OnInit {

  displayedColumns : string[] = ["screen","status","action"]

  emailValue : any;

  selectedID : number;

  userId : string;
  adminUserId : string;

  dataList =  []

  dataSource;

  showModal : boolean = false;

  constructor(
    private clientDetailService : ClientDetailsService,
    private adminService : AdminService,
    private toasterService : ToasterService,
    private adminDetailService : AdminDetailServiceService
    ) {
   }

  ngOnInit() {
    this.userId = this.clientDetailService.getClientId();
    this.adminUserId = this.adminDetailService.getAdminUserId();
    this.getAllManageEmailList();
  }

  OnEdit(data : any){
    this.showModal = true;
    this.selectedID = data.id;
    this.emailValue = data.screenStatus;
    this.adminService.adminEmailManager(data.id,this.adminUserId).subscribe((response) => {
        this.selectedID = response["ProcessVariables"]["id"];
        this.emailValue = response["ProcessVariables"]["screenStatus"];
    },(error) =>{
        this.toasterService.showError('Failed to Fetch the Data','');
        console.log('Error ',error);
    })
  }

  submitDialog(){
    const screenStatus = this.emailValue;
    this.adminService.updateManageEmail(+this.selectedID,this.adminUserId,screenStatus).
      subscribe((response: any) => {
      const {
        ProcessVariables  : { error : {
          code,
          message
        }}
      } = response;
      if(code == '0'){
        this.toasterService.showSuccess('Email Sending Options Updated Successfully','');
        this.showModal = false;
        this.getAllManageEmailList();
      }
    },(error) =>{
      this.toasterService.showError('Failed to Update','');
      console.log('Error ',error)
    }) 
  }

  getAllManageEmailList(){
      this.adminService.getAllManageEmailList().subscribe(
        (response : any) => {
          const ProcessVariables = response.ProcessVariables || {};
          const error = ProcessVariables.error || {};
          if(error.code === '0'){
            this.dataSource = ProcessVariables.manageEmailList || [];
          }else{
            this.toasterService.showError(error.message,'');
          }
      },(error) => {
          this.toasterService.showError(error.message,'');
      }) 
  }

}
