import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HttpService } from '@services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private apiService : ApiService,
              private httpService : HttpService) { }

  createandEditEmailTemplates(data){

    const {
      api : {
        createAndUpdateEmailTemplate : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);
  
  }

  getEmailTemplateById(data){

    const {
      api : {
        getEmailTemplateById : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }

  getAllEmailTemplates(){

    const {
      api : {
        getAllEmailTemplates : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {}

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }

}
