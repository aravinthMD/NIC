import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-approve-sms',
  templateUrl: './approve-sms.component.html',
  styleUrls: ['./approve-sms.component.scss']
})
export class ApproveSmsComponent implements OnInit {
public requestId;
public accountName: string = null;
public projectNumber: string = null;
public approverName : string = null;
public dateOfRequest : string = null;
public dateOfApproval : string = null;
public approvedOnBehalf : string = null;
public requestedCredits : string = null;
public remarks : string = null;
public department : string = null;
public city : string = null;
public state : string = null;
public status : string = null;
public smsApprover: string = null;
public myComments: string = null;
public messageText: string = null;
public actionText: string = null;
public actionValue: string = null;
public showModal:boolean
public requestRaisedBy:  string = null;

  constructor(private loginService: LoginService,
              private activatedRoute: ActivatedRoute,
             
              private tosterService: ToasterService,
              private router: Router,
              private utilityService: UtilityService) { 
                
                
              }

  async ngOnInit() {
    this.requestId = (await this.getRequestId()) as string;
    const data ={"userId" :this.requestId , "validity" : 900, "zoneId" : 98}
    this.loginService.createSession(data).subscribe(res =>
      {
        const authResponse = res['payload'];
        if (res['status']){
          console.log("my response",res)
          const xAuthSessionId = authResponse["auth"]["sessionId"]
          console.log("xAuthSessionId",xAuthSessionId);
          this.loginService.getSmsAllcationData(Number(this.requestId),xAuthSessionId).subscribe(res =>
            {
              const response =  res['payload'];
            if(res['status'] && response["processResponse"]['Error'] == 0 &&
               response["processResponse"]['ProcessVariables']['error']['code'] == 0){
               const myData = response["processResponse"]['ProcessVariables']
              
            console.log("getSmsAllcationData response",response);
              
                if (myData['status'] != '0') {
                  const modal = document.getElementById("myModal");
                  modal.style.display = 'block';
                  this.messageText = 'This request is already processed'
                  return;
              
              }else {
                this.accountName = myData.accountName;
                this.projectNumber = myData.projectNumber;
                this.approverName = myData.approvedBy;
                this.dateOfRequest = myData.dateOfRequest;
                this.dateOfApproval = myData.dateOfApproval;
                this.approvedOnBehalf = myData.onApprovalOf;
                this.requestedCredits = myData.requestedCredit;
                this.remarks = myData.remark;
                this.department = myData.department;
                this.city = myData.city;
                this.state = myData.state;
                this.status = myData.status;
                this.smsApprover = myData.smsApprover;
                this.requestRaisedBy = myData.requestRaisedBy;


              }
            
          }else {
            this.tosterService.showError(response["processResponse"]['ProcessVariables']['error'] ?
              response["processResponse"]['ProcessVariables']['error']['message']: response["processResponse"]['ProcessVariables']?
              response["processResponse"]['ProcessVariables']['ErrorMessage']: '','');
            this.utilityService.logOut();
          }
            }
            )
        }else{
        this.tosterService.showError(authResponse['error']['message'],'Error');       
        this.utilityService.logOut();
        // this.router.navigate(['']);
        }
       
      }
      )
     
  }

  getRequestId() {
    return new Promise((resolve) => {
     const data =  this.activatedRoute.snapshot.params;
        if (!data.requestId) {
          resolve(null);
        }
        resolve(String(data.requestId));
      });   
  }

  onModalOkay() {
    this.utilityService.logOut();
    const modal = document.getElementById("myModal");
    modal.style.display = 'none';
}

sendUserResponse(value){
  if (value == 1){
    this.actionText = 'Approve'
    this.actionValue = value;
    this.showModal = true;
  }else{
    this.actionText = 'Reject';
    this.actionValue = value;
    this.showModal = true;
  }
}

submitAction(){
  this.showModal = false;
    const id = Number(this.requestId || 0);
    const statusComment = this.myComments;

    const data = {
                    id:  this.actionValue,
                    status: this.actionValue,
                    statusComment,
                 }
  this.loginService.submitSmsApproveStatus(data).subscribe(res =>
    {
      console.log('submitSmsApproveStatus',res);
      const response =  res['payload'];
      if(res['status'] && response["processResponse"]['Error'] == 0  && 
          response["processResponse"]['ProcessVariables']['error']['code'] == 0){
         const myData = response["processResponse"]['ProcessVariables']
          // 
      console.log("getSmsAllcationData response",response);        
          if (myData['status'] !== '0') {
            this.messageText = 'Updated successfully';
            const modal = document.getElementById("myModal");
            modal.style.display = 'block';
            this.showSnackbar('Updated successfully')
           
            return;
        
        }            
      
    }else {
      this.tosterService.showError(response["processResponse"]['ProcessVariables']['error'] ?
        response["processResponse"]['ProcessVariables']['error']['message']: response["processResponse"]['ProcessVariables']?
        response["processResponse"]['ProcessVariables']['ErrorMessage']: '','');
      this.utilityService.logOut();
    }

    })

  }
  showSnackbar(message, isError = false) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    if(isError) {
        x.classList.add('snackbar-error');
    } else {
        x.classList.remove('snackbar-error');
    }
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
onCancel() {
  this.showModal = false;
}

}
