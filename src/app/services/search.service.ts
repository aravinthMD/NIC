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

        let body: any= JSON.stringify({ 
            processId,
            projectId,
            workflowId,
            ProcessVariables: data,
          }
        );
          body = 'processVariables=' + body;
    
          const url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
          return this.httpService.post(url,body);
    }
    
}