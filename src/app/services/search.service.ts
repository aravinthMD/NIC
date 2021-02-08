import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class SearchService {

    constructor(private httpService: HttpService)  {}

    searchProjectExecution({processId,projectId,workflowId},data) {
          processId;
         projectId ;
        workflowId 

        let requestEntity: any= { 
            processId,
            projectId,
            workflowId,
            ProcessVariables: data,
          }
        ;

    
          const url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
          return this.httpService.post(url,requestEntity);
    }
    
}