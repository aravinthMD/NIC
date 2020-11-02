import { Injectable } from '@angular/core';

import { ApiService } from '@services/api.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@services/http.service'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService,private httpService: HttpService) { }

  getLogin(data?) {
    const processId = this.apiService.api.getLogin.processId;
    const workflowId = this.apiService.api.getLogin.workflowId;
    const projectId = this.apiService.api.getLogin.projectId;

   
    const body = {
      processId,
      ProcessVariables: {
        username: data.username,
        password: data.password
      },
      workflowId,
      projectId,
    };

    let url = `${environment.host}d/workflows/${workflowId}/execute?projectId=${projectId}`;
    return this.httpService.post(url, body);
  }

}
