import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ToasterService } from '@services/toaster.service';
import { LoginService } from '@services/login.service'
import { UtilityService } from '@services/utility.service';
import { AdminDetailServiceService } from '@services/admin-detail-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  errroMsg: string;


  constructor(private router : Router,
              private formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private loginService: LoginService,
              private utilityService: UtilityService,
              private adminDetailService : AdminDetailServiceService) {

    this.form = this.formBuilder.group({
      userName: [null],
      password: [null]
    })
   }

  ngOnInit() {
  }


  login(){

    console.log(this.form.value)
    if(!this.form.value.userName){
      this.errroMsg = 'Please enter the user name';
    }else if(!this.form.value.password){
      this.errroMsg = 'Please enter the password';
    }else {

      const data = {
        // username: 'akshaya.venkataraman@appiyo.com',
        // password: 'inswit@123' 
        username: this.form.value.userName,
        password: this.form.value.password     
      }
      this.utilityService.setUserDetail(this.form.value);
      // localStorage.setItem('userName',data.username)

      this.loginService.loginApplication(data).subscribe(res => 
          { 
            if(res['status'] ==  true){
            console.log("login Response",res)
            sessionStorage.setItem('token', res['token'] || '');
            // localStorage.setItem("token",res["token"]);
            const userData = this.utilityService.getUserData()
            console.log("user Data",userData)
            this.getUserDetails({username: userData.userName ?  userData.userName: null           
              })
          }else{
            this.toasterService.showError("Invalid User",'Login')
          }
          }
        )     
      
    }
    
   
  }

  getUserDetails(data) {

    this.loginService.getLogin(data).subscribe((response: any) => {
        const error =  response.Error;
        const errorMessage = response.ErrorMessage;
        if (error !== '0') {
          return this.toasterService.showError(errorMessage, '');
        }
        const processVariables = response.ProcessVariables;
        const errorObj = processVariables.error;

        if (errorObj.code !== '0')  {
          return this.toasterService.showError(errorObj.message, '');
        }
        this.toasterService.showSuccess('Logged Successfully', '');
        this.utilityService.setLoginDetail(processVariables);
        this.adminDetailService.setAdminUserId(processVariables.userId ? processVariables.userId : '');
        localStorage.setItem('sessionId', processVariables.userId);
        this.utilityService.setNotifications(processVariables.notificationList);        
        // localStorage.setItem('roleName', processVariables.roleName);
        // localStorage.setItem('userName', processVariables.username)
        this.router.navigate(['dashboard']);
      });

  }

  // forgotPassword() {


  //   if(!this.form.value.userName){
  //     this.errroMsg = 'Please enter the username to reset password'
  //     // this.toasterService.showError('Please enter the useranme to reset password','')
  //   }else {

  //     const username = this.form.value.userName;

  //     localStorage.setItem('userName',this.form.value.userName)

  //     this.loginService.forgotPassword(username).subscribe((response)=> {

  //       if(response['Error'] == 0 && response['ProcessVariables']['otp']) {
  //         this.toasterService.showSuccess('OTP Sent Successfully','')
  //         this.router.navigate(['/verifyotp'])
  //       }else {
  //         // this.toasterService.showError('Invalid Username','')
  //         // this.errroMsg = 'Invalid username'
  //         this.toasterService.showError('Invalid User Name','')
  //       }
             
  //     })

    

  //   }
  // }

  forgotPassword() {
    
    if(!this.form.value.userName){
          this.errroMsg = 'Please enter the username to reset password'
          // this.toasterService.showError('Please enter the useranme to reset password','')
      }else {
        this.utilityService.setUserDetail(this.form.value);
        const username = this.form.value.userName;

        const data ={"userId" : username, "validity" : 900, "zoneId" : 98}
        // X-AUTH-SESSIONID
        this.loginService.createSession(data).subscribe((response)=> {
        const getResponse =  response;
        console.log("createSession response",response);
        if (getResponse["status"] == true){     
          const xAuthSessionId = getResponse["payload"]["auth"]["sessionId"]
          console.log("xAuthSessionId",xAuthSessionId);
          this.loginService.forgotPassword(username,xAuthSessionId).subscribe((res)=> {
            const response =  res['payload'];
            if(res['status'] && response["processResponse"]['Error'] == 0 && 
                response["processResponse"]['ProcessVariables']['error']['code'] == 0){
            console.log("forgotPassword response",response);
            this.router.navigate(['/verifyotp'])
          }else {
            this.toasterService.showError(response["processResponse"]['ProcessVariables']['error'] ?
              response["processResponse"]['ProcessVariables']['error']['message']: response["processResponse"]['ProcessVariables']?
              response["processResponse"]['ProcessVariables']['ErrorMessage']: '','');
          }
          })

        }else {
          this.toasterService.showError("Invalid User",'Login');
        }

       })
      }
  }

}
