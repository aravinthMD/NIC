import { Injectable } from '@angular/core';

import { ApiService } from '@services/api.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@services/http.service'
import { HttpParams } from '@angular/common/http';
import { HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: ApiService,private httpService: HttpClient) { }


  fetchLovsList(){
    const processId = this.apiService.api.gtLovsList.processId;
    const workflowId = this.apiService.api.gtLovsList.workflowId;
    const projectId = this.apiService.api.gtLovsList.projectId;

    const data = {}

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

getLovSubMenuList(menuId) {

  const processId = this.apiService.api.getLovSubmenuList.processId;
  const workflowId = this.apiService.api.getLovSubmenuList.workflowId;
  const projectId = this.apiService.api.getLovSubmenuList.projectId;

  const data = {
    "result" : menuId
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

updateLov(lov) {

      const processId = this.apiService.api.updateLov.processId;
      const workflowId = this.apiService.api.updateLov.workflowId;
      const projectId = this.apiService.api.updateLov.projectId;

      const data = {
        "result":lov['listId'],
        "option":"update",
        "name":lov['value'],
        "id":lov['key']
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

deleteLov(lov) {

  const processId = this.apiService.api.deleteLov.processId;
  const workflowId = this.apiService.api.deleteLov.workflowId;
  const projectId = this.apiService.api.deleteLov.projectId;

  const data = {
    "result":lov['listId'],
    "option":"delete",
    "id":lov['key']
  }


  const requestEntity: any = {
    processId,
    ProcessVariables: data,
    workflowId,
    projectId,
  };

  console.log('RE',requestEntity)
  const body = {
    processVariables: JSON.stringify(requestEntity),
  };

  const formData = this.transform(body);

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

  return this.httpService.post(url,formData);

}

insertLov(lov) {

  const processId = this.apiService.api.insertLov.processId;
  const workflowId = this.apiService.api.insertLov.workflowId;
  const projectId = this.apiService.api.insertLov.projectId;

  const data = {
    "result":lov['listId'],
    "option":"insert",
    "name":lov['value']
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


createAdminUser(data) {

  const processId = this.apiService.api.createAdminUser.processId;
  const workflowId = this.apiService.api.createAdminUser.workflowId;
  const projectId = this.apiService.api.createAdminUser.projectId;


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

fetchAllAdminUser() {

  const processId = this.apiService.api.fetchAllAdminUser.processId;
  const workflowId = this.apiService.api.fetchAllAdminUser.workflowId;
  const projectId = this.apiService.api.fetchAllAdminUser.projectId;


  const requestEntity: any = {
    processId,
    ProcessVariables: {},
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

getParticularAdminUser(id) {

  const processId = this.apiService.api.getParticularAdminUser.processId;
  const workflowId = this.apiService.api.getParticularAdminUser.workflowId;
  const projectId = this.apiService.api.getParticularAdminUser.projectId;


  const requestEntity: any = {
    processId,
    ProcessVariables: {
      "userId": String(id)
    },
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

updateAdminUser(data) {

  const processId = this.apiService.api.updateAdminUser.processId;
  const workflowId = this.apiService.api.updateAdminUser.workflowId;
  const projectId = this.apiService.api.updateAdminUser.projectId;


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

deleteAdminUser(id) {

  const processId = this.apiService.api.deleteAdminUser.processId;
  const workflowId = this.apiService.api.deleteAdminUser.workflowId;
  const projectId = this.apiService.api.deleteAdminUser.projectId;


  const requestEntity: any = {
    processId,
    ProcessVariables: {
      "id": String(id)
    },
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
