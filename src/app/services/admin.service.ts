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
export class AdminService {

  constructor(private apiService: ApiService,
              private httpService: HttpService) { }


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

    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

    return this.httpService.post(url,requestEntity);


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

  

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

  return this.httpService.post(url,requestEntity);


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



uploadToAppiyoDrive(file : any)
{
  let uri = environment.host + environment.appiyoDrive;
  let headers = {
    headers: new HttpHeaders({
     // 'Content-Type': 'application/json'
    })
    
  };
//  const headers = {
//     'Content-Type': 'application/json'
//   }
  const formData = new FormData();
  formData.append('file[]',file,file.name); 
  return this.httpService.post(uri,formData,headers);
}

adminEmailManager(id : number,userId  :string,screenStatus ?: string){
  const {
    api : {
      adminEmailManageAPI : {
          workflowId,
          processId,
          projectId
      }
    }
} = this.apiService;


const data = {
    id,
    userId,
    screenStatus,
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
return  this.httpService.post(url,formData);

}

getAllLov(userId : string){

  const {
    api : {
      lovListAPI : {
          workflowId,
          processId,
          projectId
      }
    }
} = this.apiService;

const data = {
  userId
}

const requestEntity  : RequestEntity  = {
  processId,
  ProcessVariables : data,
  projectId,
  workflowId
}

// const body = {
//   processVariables : JSON.stringify(requestEntity)
// };

// const formData = this.transform(body)

let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;

return  this.httpService.post(url,requestEntity);

}


transform(data: any) {
  return new HttpParams({ fromObject: data });
}
}
