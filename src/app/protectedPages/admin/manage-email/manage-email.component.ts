import { Component, OnInit } from '@angular/core';
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

  dataList =  []

  dataSource;

  showModal : boolean = false;

  constructor(private clientDetailService : ClientDetailsService,private adminService : AdminService,private toasterService : ToasterService) {
      this.dataSource = this.clientDetailService.getManageEmailList();
   }

  ngOnInit() {
    this.userId = this.clientDetailService.getClientId();
  }

  OnEdit(data : any){
    this.showModal = true;
    this.selectedID = data.id;
    this.emailValue = data.screenStatus;
    this.adminService.adminEmailManager(data.id,'73').subscribe((response) => {
        this.selectedID = response["ProcessVariables"]["id"];
        this.emailValue = response["ProcessVariables"]["screenStatus"];
    },(error) =>{
        this.toasterService.showError('Failed to Fetch the Data','');
        console.log('Error ',error);
    })
  }

  submitDialog(){
    const screenStatus = this.emailValue;
    this.adminService.adminEmailManager(+this.selectedID,this.userId,screenStatus).subscribe((response) => {
      const { 
        ProcessVariables  : { error : {
          code,
          message
        }}
      } = response;
      if(code == '0'){
        this.toasterService.showSuccess('Email Sending Options updated Successfully','');
        this.showModal = false
      }
    },(error) =>{
      this.toasterService.showError('Failed to Update','');
      console.log('Error ',error)
    }) 
  }

}
