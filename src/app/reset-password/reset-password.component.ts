import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

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

  constructor(private formBuilder : FormBuilder) {
    this.form = this.formBuilder.group({
      password : [null,[Validators.required,Validators.pattern(this.pwdPattern)]]

      
    })
   }



  ngOnInit() {
  }

  get password(){
    return this.form.get('password');
  }


}
