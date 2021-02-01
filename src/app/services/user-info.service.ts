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

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

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

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

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
  
    const body = {
      processVariables: JSON.stringify(requestEntity),
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  
    return this.httpService.post(url,formData);
  
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

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

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
        currentClientId : Number(clientId),
        temp:'get'
      }

      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }

      const body = {
        processVariables : JSON.stringify(requestEntity)
      };

      const formData = this.transform(body)

      let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
      return  this.httpService.post<any>(url,formData);

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
  
    const body = {
      processVariables: JSON.stringify(requestEntity),
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  
    return this.httpService.post(url,formData);
  
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
  
  const body = {
    processVariables : JSON.stringify(requestEntity)
  };
  
  const formData = this.transform(body)
  
  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);
  
  }
  
  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }   
}
