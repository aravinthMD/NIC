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
        username: 'akshaya.venkataraman@appiyo.com',
        password: 'inswit@123'      
      }

      // localStorage.setItem('userName',data.username)

      this.loginService.loginApplication(data).subscribe(res => 
          { console.log("login Response",res)
            localStorage.setItem("token",res["token"]);
            this.getUserDetails({username:'akshaya',
            password: 'inswit@123'})
          }
        )     
      
    }
    
   
  }

  getUserDetails(data){

    this.loginService.getLogin(data).subscribe((response: any)=> {    
        if(response['ProcessVariables']['countUser'] === ''){
          // this.errroMsg = response['ProcessVariables']['response']
          const errMsg  = response['ProcessVariables']['response']
          this.toasterService.showError(errMsg,'')
        } else if(response['ProcessVariables']['countUser'] === '0'){
          const errMsg  = response['ProcessVariables']['response'];
          this.toasterService.showError(errMsg,'');
          // this.errroMsg = response['ProcessVariables']['response']
        }
        else if(response['ProcessVariables']['countUser'] === '1') {

          this.toasterService.showSuccess('Logged Successfully','')
          const processVariables = response.ProcessVariables;
          localStorage.setItem('roleName', processVariables.roleName);
          this.router.navigate(["users/Dashboard/"]);
       }
          
      })

  }

  forgotPassword() {


    if(!this.form.value.userName){
      this.errroMsg = 'Please enter the username to reset password'
      // this.toasterService.showError('Please enter the useranme to reset password','')
    }else {

      const username = this.form.value.userName;

      localStorage.setItem('userName',this.form.value.userName)

      this.loginService.forgotPassword(username).subscribe((response)=> {

        if(response['Error'] == 0 && response['ProcessVariables']['otp']) {
          this.toasterService.showSuccess('OTP Sent Successfully','')
          this.router.navigate(['/verifyotp'])
        }else {
          // this.toasterService.showError('Invalid Username','')
          // this.errroMsg = 'Invalid username'
          this.toasterService.showError('Invalid User Name','')
        }
             
      })

    

    }
  }

}
