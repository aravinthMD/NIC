import { Injectable } from '@angular/core';

import { HttpService } from '../../../../services/http.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProjectExecutionService {

    constructor(private httpService: HttpService)  {}

    searchProjectExecution(data) {
        const  processId = 'b216c2b24f5811ebb884727d5ac274b2';
        const projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
        const workflowId =  'b216c2b24f5811ebb884727d5ac274b2';

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