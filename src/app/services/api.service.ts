import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  api = {
    getLogin: {
      workflowId: '4e04d4101cd311ebb6c2727d5ac274b2',
      processId: '52422fd01cd511ebb6c2727d5ac274b2',
      projectId: environment.projectIds.projectId,
    },

    getManageUsers : {
      workflowId : '4e04d4101cd311ebb6c2727d5ac274b2',
      processId : '99e4de201d0011ebb6c2727d5ac274b2',
      projectId : environment.projectIds.projectId
    }
  }


}
