import { Injectable } from '@angular/core';

import { ApiService } from '@services/api.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@services/http.service'
import { HttpParams } from '@angular/common/http';
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService,private httpService: HttpClient) { }

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

    data =  {
      username : data.username,
      password : data.password,
    }


    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };

    const body = {
      processVariables: JSON.stringify(requestEntity),
    };

    const formData = this.transform(body);

   
    // const body = {
    //   processVariables : {
    //     processId,
    //   ProcessVariables: {
    //     username: data.username,
    //     password: data.password
    //   },
    //   workflowId,
    //   projectId,
    //   }
      
    // };

    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

  //  let url = 'http://178.128.125.44/appiyo/d/workflows/52422fd01cd511ebb6c2727d5ac274b2/execute?projectId=2efbdc721cc311ebb6c0727d5ac274b2';
    // return this.httpService.post(url, formData);
    return this.httpService.post(url,formData);
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
  
      const body = {
        processVariables: JSON.stringify(requestEntity),
      };
  
      const formData = this.transform(body);
  
      let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

      return this.httpService.post(url,formData);


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

    const body = {
      processVariables: JSON.stringify(requestEntity),
    };

    const formData = this.transform(body);

    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

    return this.httpService.post(url,formData);



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

    const body = {
      processVariables: JSON.stringify(requestEntity),
    };

    const formData = this.transform(body);

    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

    return this.httpService.post(url,formData);



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

    const body = {
      processVariables: JSON.stringify(requestEntity),
    };

    const formData = this.transform(body);

    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

    return this.httpService.post(url,formData);



  }

  
  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }


}
