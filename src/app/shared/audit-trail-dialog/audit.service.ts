import { Injectable } from "@angular/core";
import { ApiService } from "@services/api.service";
import { HttpService } from "@services/http.service";
import { environment } from "src/environments/environment";

@Injectable(
    {
        providedIn: "root"
    })

 export class AuditService {

    constructor(private httpService: HttpService,
                private apiService: ApiService){
        
    }
    getAuditTrails(data){
        const processId = this.apiService.api.getAuditTrails.processId;
        const workflowId = this.apiService.api.getAuditTrails.workflowId;
        const projectId = this.apiService.api.getAuditTrails.projectId;       
    
        const requestEntity: any = {
          processId,
          ProcessVariables: data,
          workflowId,
          projectId,
        };    
       
        let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
 
        return this.httpService.post(url,requestEntity);  
        
      }
        
}

 