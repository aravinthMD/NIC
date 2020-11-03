import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ToasterService } from '@services/toaster.service';
import { LoginService } from '@services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  errroMsg: string;


  constructor(private router : Router,private formBuilder: FormBuilder,private toasterService: ToasterService,private loginService: LoginService) {

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
        username: this.form.value.userName,
        password: this.form.value.password
      }

      this.loginService.getLogin(data).subscribe((response)=> {

        if(response['ProcessVariables']['countUser'] === ''){
          this.errroMsg = response['ProcessVariables']['response']
        } else if(response['ProcessVariables']['countUser'] === '0'){
          this.errroMsg = response['ProcessVariables']['response']
        }
        else if(response['ProcessVariables']['countUser'] === '1') {

          this.toasterService.showSuccess(response['ProcessVariables']['response'],'')
          this.router.navigate(["users/Dashboard/"]);


       }

          console.log(response)
      })

      
    }
    
   
  }

  forgotPassword() {

    if(!this.form.value.userName){
      this.toasterService.showError('Please enter the useranme to reset password','')
    }else {
    this.router.navigate(['/verifyotp'])

    }
  }

}
