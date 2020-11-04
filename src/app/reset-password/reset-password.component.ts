import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { ToasterService } from '@services/toaster.service';
import { Router } from '@angular/router'

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

  constructor(private formBuilder : FormBuilder,private toasterService: ToasterService,private router: Router) {
    this.form = this.formBuilder.group({
      newPassword : [null],
      confirmPassword: [null]
      
    })
   }



  ngOnInit() {
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
      this.toasterService.showSuccess('New Password Updated Successfully.','')
      this.router.navigate(['/']);
    }
  }


}
