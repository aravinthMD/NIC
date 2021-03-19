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

 // Admin Department, Sales Department, Operations Department and Finance Department

  

  constructor(private apiService: ApiService,private httpService: HttpService) { }




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
  
    
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  
    return this.httpService.post(url,requestEntity);
  
  } 


  fetchAllCustomers() {

    const {
      api : {
        getAllCustomerDetails : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;


  const requestEntity  : any  = {
    processId,
    ProcessVariables : {},
    projectId
  }

  
  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
 return this.httpService.post(url,requestEntity);

}

  getCustomerDetailByCustomerId(customerId : string){

    const {
      api : {
        getCustomerDetailByCustomerId : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    currentCustomerId  : Number(customerId),
    temp : "get"

  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
 return this.httpService.post(url,requestEntity);

  }


  /// create technical Admin details 

  createTechnicalAdmin(data) {

    const processId = this.apiService.api.createTechnicalAdmin.processId;
    const workflowId = this.apiService.api.createTechnicalAdmin.workflowId;
    const projectId = this.apiService.api.createTechnicalAdmin.projectId;
  
  
    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };
  
   
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  
    return this.httpService.post(url,requestEntity);
  
  }

  fetchAllTechAdmins() { 

    const {
      api : {
        getAllTechAdminDetails : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;


  const requestEntity  : any  = {
    processId,
    ProcessVariables : {},
    projectId
  }

  

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
 return this.httpService.post(url,requestEntity);

}

      getTechAdminDetailById(clientId : string){

        const {
          api : {
            getTechAdminDetailById : {
                workflowId,
                processId,
                projectId
            }
          }
      } = this.apiService;

      const data = {
       id : String(clientId)
       
      }

      const requestEntity  : any  = {
        workflowId,
        processId,
        ProcessVariables : data,
        projectId
      }

      

      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
     return this.httpService.post(url,requestEntity);

      }


   /// create technical Admin details

   createBilling(data) {

    const processId = this.apiService.api.createBillingDetails.processId;
    const workflowId = this.apiService.api.createBillingDetails.workflowId;
    const projectId = this.apiService.api.createBillingDetails.projectId;
  
  
    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };
  
    
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  
    return this.httpService.post(url,requestEntity);
  
  }

  getBillingAdminDetailById(clientId : string){

    const {
      api : {
        getBillingAdminDetailById : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;
  
  const data = {
    currentBillId : Number(clientId),
    temp: 'get'
  }
  
  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }
  
 
  
  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
 return this.httpService.post(url,requestEntity);
  
  }
  
  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }   
}
