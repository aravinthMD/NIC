import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@services/login.service';
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss']
})
export class ActiveUserComponent implements OnInit {
  public customerId: string;
  public status:   string = null;               
  public applicantName: string = null; 
  public department: string = null; 
  public city: string = null; 
  public state: string = null; 
  public userId: string = null; 
  public remarks: string = null; 
  public messageText: string = null; 
  public actionText: string = null;
  public actionValue: any;
  public showModal: boolean;
  constructor(private loginService: LoginService,
              private tosterService: ToasterService,
              private utilityService: UtilityService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.customerId = (await this.getCustomerId()) as string;
    const data ={"userId" :this.customerId , "validity" : 900, "zoneId" : 98}
    this.loginService.createSession(data).subscribe(res =>
      {
        const authResponse = res['payload'];
        if (res['status']){
          console.log("my response",res)
          const xAuthSessionId = authResponse["auth"]["sessionId"]
          console.log("xAuthSessionId",xAuthSessionId);
          this.loginService.getAccountActivationData(Number(this.customerId),xAuthSessionId).
            subscribe(res => {
              const response =  res['payload'];
              if(res['status'] && response["processResponse"]['Error'] == 0 &&               
                  response["processResponse"]['ProcessVariables']['error']['code'] == 0){
                
                 const myData = response["processResponse"]['ProcessVariables']
                
              console.log("getSmsAllcationData response",response);
                
                  if (myData['smsFlag'] != '0') {
                    const modal = document.getElementById("myModal");
                    modal.style.display = 'block';
                    this.messageText = 'This request is already processed'
                    return;
                
                }else {
                  this.status = myData.status;                  
                  this.applicantName = myData.applicantName;
                  this.department = myData.department;
                  this.city = myData.city;
                  this.state = myData.state;
                  this.userId = myData.userId;
                  this.remarks = myData.remark;
                }
              
            }else {
              this.tosterService.showError(response["processResponse"]['ProcessVariables']['error'] ?
                response["processResponse"]['ProcessVariables']['error']['message']: response["processResponse"]['ProcessVariables']?
                response["processResponse"]['ProcessVariables']['ErrorMessage']: '','');
              this.utilityService.logOut();
            }

            }
            )} else{
              this.tosterService.showError(authResponse['error']['message'],'Error');       
              this.utilityService.logOut();
            }
      })
  }
    

      getCustomerId() {
        return new Promise((resolve) => {
         const data =  this.activatedRoute.snapshot.params;
            if (!data.customerId) {
              resolve(null);
            }
            resolve(String(data.customerId));
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

    userApproveResponse() {  
      this.showModal = false;
      const data = {
          id: this.customerId,
          isApprove: this.actionValue,
          status: this.status
      }
      this.loginService.sendUserResponse(data).subscribe(res =>
        {          
      console.log('sendUserResponse',res);
      const response =  res['payload'];
      if(res['status'] && response["processResponse"]['Error'] == 0 
          &&  response["processResponse"]['ProcessVariables']['error']['code'] == 0){        
          //  
         const myData = response["processResponse"]['ProcessVariables'] 
             
          if (myData['smsFlag'] != '0') {
            this.messageText = 'Updated successfully';
            const modal = document.getElementById("myModal");
            modal.style.display = 'block';
            // this.showSnackbar('Updated successfully')
           
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

    onCancel() {
      this.showModal = false;
    }
}
