import { Injectable } from '@angular/core';

import { ApiService } from '@services/api.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@services/http.service'
import { HttpParams } from '@angular/common/http';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import RequestEntity from '@model/request.entity';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService,
    private httpService: HttpService) { }

  getLoginCredentials(data) {
    const url =
      environment.host + 'account/'+ environment.apiVersion.login +'login';
    let body = {
      email : data.email,
      password : data.password,
      useADAuth: false
    };
    return this.httpService.post(url, body);
  }


  getLogin(data?) {
    const processId = this.apiService.api.getLogin.processId;
    const workflowId = this.apiService.api.getLogin.workflowId;
    const projectId = this.apiService.api.getLogin.projectId;

    let myData =  {
      username : data.username,
      password: data.password,
      longTermToken: true      
    }


    const body: RequestEntity = {
      processId: processId,
      workflowId: workflowId,
      ProcessVariables: myData,
      projectId:   projectId  
    };   

    let url = `${environment.host}d/workflows/${processId}/${environment.apiVersion.api}execute?projectId=${projectId}`;
  
    return this.httpService.post(url,body);
  }

loginApplication(data){
  
    let body = {
      email: data.username,
      password: data.password,
      useADAuth: data.useADAuth
    };
    const url = environment.host + 'account/' + environment.apiVersion.login + 'login';
      // http://178.128.125.44/appiyo/account/v3/login
    return this.httpService.post(url, body);
}



  fetchManageUsers(){
      const processId = this.apiService.api.getManageUsers.processId;
      const workflowId = this.apiService.api.getManageUsers.workflowId;
      const projectId = this.apiService.api.getManageUsers.projectId;

      const data = {
          id : 0
      }

      const requestEntity: any = {
        processId,
        ProcessVariables: data,
        workflowId,
        projectId,
      };
  
     
  
      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

      return this.httpService.post(url,requestEntity);


  }


  forgotPassword(username: string) {

    const processId = this.apiService.api.forgotPassword.processId;
    const workflowId = this.apiService.api.forgotPassword.workflowId;
    const projectId = this.apiService.api.forgotPassword.projectId;

    const data = {
      name : username
  }

    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };

   

    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

    return this.httpService.post(url,requestEntity);



  }

  verifyOTP(request: any) {

    const processId = this.apiService.api.verifyOTP.processId;
    const workflowId = this.apiService.api.verifyOTP.workflowId;
    const projectId = this.apiService.api.verifyOTP.projectId;

    const data = {
      otp: request['otp'],
      username: request['username']
  }

    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };

   

    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

    return this.httpService.post(url,requestEntity);



  }

  resetPassword(request: any) {

    const processId = this.apiService.api.changePassword.processId;
    const workflowId = this.apiService.api.changePassword.workflowId;
    const projectId = this.apiService.api.changePassword.projectId;

    const data = {
      username: request['username'],
      password: request['password'],
      verifyOTP: true
  }

    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };

   

    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

    return this.httpService.post(url,requestEntity);



  }

  
  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }


}
