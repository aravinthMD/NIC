import { Injectable } from '@angular/core';
 
import { ApiService } from '@services/api.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@services/http.service'
import { HttpParams } from '@angular/common/http';
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  
  

  constructor(private apiService: ApiService,private httpService: HttpClient) { }


  createCustomerDetails(data) {

    const processId = this.apiService.api.createCustomerDetails.processId;
    const workflowId = this.apiService.api.createCustomerDetails.workflowId;
    const projectId = this.apiService.api.createCustomerDetails.projectId;
  
  
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

  // getCustomerDetailByCustomerId(customerId : string){

  //   const {
  //     api : {
  //       getCustomerDetailByCustomerId : {
  //           workflowId,
  //           processId,
  //           projectId
  //       }
  //     }
  // } = this.apiService;

  // const data = {
  //   currentCustomerId  : customerId,
  //   temp : "get"

  // }

  // const requestEntity  : any  = {
  //   processId,
  //   ProcessVariables : data,
  //   projectId
  // }

  // const body = {
  //   processVariables : JSON.stringify(requestEntity)
  // };

  // const formData = this.transform(body)

  // let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  // return  this.httpService.post<any>(url,formData);

  // }
  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }   
}
