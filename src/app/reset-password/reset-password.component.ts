import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { ToasterService } from '@services/toaster.service';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service'
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  // pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";//Pattern
  // pwdPattern = "^(?:(?<Numbers>[0-9]{1})|(?<Alpha>[a-zA-Z]{1})|(?<Special>[^a-zA-Z0-9]{1})){6,.}$"
  // pwdPattern = "/^(?=\D*\d)(?=[^a-z]*[a-z]).{8,30}$/"
  // pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,.}$/
     pwdPattern = "^.* [a-zA-Z0-9]+.*$"

  form : FormGroup;

  errorMsg: string;

  newValidPattern: boolean;
  confirmValidPattern: boolean;

  isError: boolean;
  userData: any;

  constructor(private formBuilder : FormBuilder,
              private toasterService: ToasterService,
              private router: Router,
              private loginService: LoginService,
              private utilityService: UtilityService) {
    this.form = this.formBuilder.group({
      newPassword : [null],
      confirmPassword: [null]
      
    })
   }



  ngOnInit() {
    this.userData = this.utilityService.getUserData(); 
    if (!this.userData) {
      this.router.navigate(['']);
    }
  }

  get password(){
    return this.form.get('password');
  }


  checkPattern(event) {

    const id = event.target.id;
    const passwordVal = event.target.value;

    const checkSpecial = /[*@!#$%&()^~{}]+/.test(passwordVal);
    const checkNumber = /[0-9]+/.test(passwordVal)
    const minValLen = passwordVal.length;

      if(checkSpecial && checkNumber && minValLen >= 6) {
           if(id == 'newPasswordId') {
            this.newValidPattern = false;
           }else {
             this.confirmValidPattern = false;
           }
          
      }else {
        if(id == 'newPasswordId') {
          this.newValidPattern = true;
         }else {
           this.confirmValidPattern = true;
         }
      }

    const newPassword = this.form.value.newPassword;
    const confirmPassword = this.form.value.confirmPassword;

    if(newPassword && confirmPassword) {

      this.isError = false;
    }
    


  }

  onSubmit() {

    const newPassword = this.form.value.newPassword;
    const confirmPassword = this.form.value.confirmPassword;

    if(!newPassword) {
      this.isError = true;
      // this.toasterService.showError('Please enter new password','')
      this.errorMsg = 'Please enter new password'
    }else if(!confirmPassword) {
      this.isError = true;
      // this.toasterService.showError('Please enter confirm password','')
      this.errorMsg = 'Please enter confirm password'
    }else if(newPassword !== confirmPassword) {
      this.isError = true;
      // this.toasterService.showError('Your new password and confirmation password is mis-matched.','')
      this.errorMsg = 'Your new password and confirmation password is mis-matched.'
    }else {
      this.isError = false;

      const request = {
        username: this.userData.userName,
        password: confirmPassword
      }

      this.loginService.resetPassword(request).subscribe((response)=> {

        let message = response['ProcessVariables']['response'];
        if(response['ProcessVariables']['SameAsOld']) {
          this.toasterService.showError(message,'')
        }else if(!response['ProcessVariables']['SameAsOld']){
          this.toasterService.showSuccess(message,'')
          this.router.navigate(['/']);
        }
        
      })
      
    }
  }

  setAutoFillOff(event: any) {
    console.log("event call");
    if (event) {
      event.target.attributes['autocomplete'].value = 'chrome-off';
    }
  }


}
