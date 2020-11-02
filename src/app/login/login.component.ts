import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ToasterService } from '@services/toaster.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private router : Router,private formBuilder: FormBuilder,private toasterService: ToasterService) {

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
      this.toasterService.showError('Please enter the user name','')
    }else if(!this.form.value.password){
      this.toasterService.showError('Please enter the password','')
    }else {
      this.router.navigate(["users/Dashboard/"]);

    }
    
   
  }

}
