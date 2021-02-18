import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '@services/toaster.service';
import { LoginService } from '@services/login.service'
import { UtilityService } from '@services/utility.service';
@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.scss']
})
export class GenerateOtpComponent implements OnInit {

  otpValue: any;

  form: FormGroup;

  isReachMaxCount: boolean;

  isError: boolean;

  errorMsg: string;
  userData:any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toasterService: ToasterService, 
              private loginService: LoginService,
              private utilityService: UtilityService) { 

    this.form = this.formBuilder.group({
      otpValue: [null]
    })
  }


  ngOnInit() {
    this.userData = this.utilityService.getUserData(); 
    if (!this.userData) {
      this.router.navigate(['']);
    }
  }



  valuePatternCheck(event, pattern = /[^0-9]*/g) {
    const initialValue = event.target.value;
    const replaceValue = initialValue.replace(pattern, '');
    this.form.patchValue({
      otpValue: replaceValue
    })
   }

   verifyOTP() {

    const userData = this.utilityService.getUserData()   

    console.log('user data',userData.userName)
    if(!this.form.value.otpValue) {

      // this.toasterService.showError('Please enter the OTP to verify','')
      this.isError = true;
      this.errorMsg = 'Please enter the OTP to verify'
    }else {


      const request = {
        username: userData.userName,
        otp: this.form.value.otpValue

      }
      this.loginService.verifyOTP(request).subscribe((res)=> {
        if (res["status"]){
          const  response = res['payload']['processResponse'];
          if(response['Error'] == 0 && response['ProcessVariables']['error']['code'] == 0 ){
            this.loginService.setToken( response['authentication-token']);
            let retryCount = response['ProcessVariables']['userList']['retryCount'];
              this.form.patchValue({
                otpValue: ''
              })
              if(!response['ProcessVariables']['verifyOTP'] && Number(retryCount) >= 2) {

                  this.isReachMaxCount = true;
                  
                  this.isError = true;
                  this.errorMsg = 'You have reached maximum number of attempts, please re-generate the OTP'
                  this.toasterService.showError('You have reached maximum number of attempts, please re-generate the OTP','')
              }else if(!response['ProcessVariables']['verifyOTP']) {
              
                this.isError = true;
                this.errorMsg = 'Your OTP is Incorrect'
                this.toasterService.showError('Your OTP is Incorrect','')
              }else if(response['ProcessVariables']['verifyOTP']){
                this.isError = false;
                this.toasterService.showSuccess('OTP verified successfully','')
                this.router.navigate(['/resetpassword'])
        
              }
        }else {
          this.toasterService.showError(response['ProcessVariables']['error']['message'],'' );
        }
      }else {
        this.toasterService.showError(res["error"]['message'],'')
      }
       
      })
      

    }
   }


   resendOTP() {

    const userData = this.utilityService.getUserData();

    this.loginService.reSendOtp(userData ? userData.userName: null).subscribe((res)=> {

      const response = res['payload']['processResponse'];

      if(response['Error'] == 0 && response['ProcessVariables']['error']['code'] == 0) {
        this.isError = false;
        this.isReachMaxCount = false;
        this.toasterService.showSuccess('OTP Sent Successfully','')
      }else {
        this.isError = true;
        this.errorMsg = response['ProcessVariables']['error']['message'];
        this.toasterService.showError(response['ProcessVariables']['error']['message'],'');
      }
           
    })

   }


}
