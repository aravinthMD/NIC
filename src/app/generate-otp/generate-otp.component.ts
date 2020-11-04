import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '@services/toaster.service';
import { LoginService } from '@services/login.service'
@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.scss']
})
export class GenerateOtpComponent implements OnInit {

  otpValue: any;

  form: FormGroup;

  isReachMaxCount: boolean;

  constructor(private formBuilder: FormBuilder,private router: Router,private toasterService: ToasterService, private loginService: LoginService) { 

    this.form = this.formBuilder.group({
      otpValue: [null]
    })
  }

  ngOnInit() {
  }



  valuePatternCheck(event, pattern = /[^0-9]*/g) {
    const initialValue = event.target.value;
    const replaceValue = initialValue.replace(pattern, '');
    this.form.patchValue({
      otpValue: replaceValue
    })
   }

   verifyOTP() {

    const username = localStorage.getItem('userName');

    console.log(username)
    if(!this.form.value.otpValue) {

      this.toasterService.showError('Please enter the OTP to verify','')
    }else {


      const request = {
        username: username,
        otp: this.form.value.otpValue

      }
      this.loginService.verifyOTP(request).subscribe((response)=> {

        let retryCount = response['ProcessVariables']['userList']['retryCount']
        if(!response['ProcessVariables']['verifyOTP'] && Number(retryCount) >= 2) {

            this.isReachMaxCount = true;
            this.toasterService.showError('You have reached maximum number of attempts, please re-generate the OTP','')
        }else if(!response['ProcessVariables']['verifyOTP']) {
          this.toasterService.showError('Your OTP is Incorrect','')
        }else if(response['ProcessVariables']['verifyOTP']){
          this.toasterService.showSuccess('OTP verified successfully','')
          this.router.navigate(['/resetpassword'])
  
        }

       
      })
      

    }
   }


   resendOTP() {

    const username = localStorage.getItem('userName');


    this.loginService.forgotPassword(username).subscribe((response)=> {

      if(response['Error'] == 0 && response['ProcessVariables']['otp']) {
        this.isReachMaxCount = false;
        this.toasterService.showSuccess('OTP Sent Successfully','')
      }else {
        this.toasterService.showError('Please provide valid username to send OTP','')
      }
           
    })

   }


}
