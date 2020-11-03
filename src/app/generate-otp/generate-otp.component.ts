import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '@services/toaster.service'
@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.scss']
})
export class GenerateOtpComponent implements OnInit {

  otpValue: any;

  form: FormGroup;


  constructor(private formBuilder: FormBuilder,private router: Router,private toasterService: ToasterService) { 

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
      this.toasterService.showSuccess('OTP verified successfully','')
    this.router.navigate(['/resetpassword'])

    }
   }


}
