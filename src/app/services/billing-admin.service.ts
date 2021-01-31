import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpService } from '@services/http.service';
import { ApiService } from '@services/api.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BillingAdminService {

    constructor(
        private httpService: HttpService,
        private apiService: ApiService
    ) {}

    getBillingAdminDetailsById(data) {
        const getBillingAdminDetailById = this.apiService.api.getBillingAdminDetailById;
        const { processId, projectId, workflowId } = getBillingAdminDetailById;
        const requestEntity: any = {
          processId,
          ProcessVariables: {
              ...data
          },
          workflowId,
          projectId,
        };
        const body = {
          processVariables: JSON.stringify(requestEntity),
        };
        const formData = this.transform(body);
        const url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
        return this.httpService.post(url, formData);
      }

      saveOrUpdateBillingAdminDetails(data) {
        const saveOrUpdateBillingAdminDetails = this.apiService.api.saveOrUpdateBillingAdminDetails;
        const { processId, projectId, workflowId } = saveOrUpdateBillingAdminDetails;
        const requestEntity: any = {
          processId,
          ProcessVariables: {
              ...data
          },
          workflowId,
          projectId,
        };
        const body = {
          processVariables: JSON.stringify(requestEntity),
        };
        const formData = this.transform(body);
        const url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
        return this.httpService.post(url, formData);
      }

      private transform(data: any) {
        return new HttpParams({ fromObject: data });
      }

}
