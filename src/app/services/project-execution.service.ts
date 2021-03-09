import { Injectable } from '@angular/core';

import { ApiService } from '@services/api.service';
import { HttpService } from '@services/http.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectExecutionService {
    constructor(
        private apiService: ApiService,
        private httpService: HttpService
    ) {

    }

    uploadCsv(data) {
        const peCsvUpload = this.apiService.api.peCsvUpload;
        const { processId, projectId, workflowId } = peCsvUpload;
        const requestEntity: any = {
          processId,
          ProcessVariables: {...data},
          workflowId,
          projectId,
        };
        const url =
        `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
        return this.httpService.post(url, requestEntity);
      }

      uploadValidData(data) {
        const peUploadValidData = this.apiService.api.peUploadValidData;
        const { processId, projectId, workflowId } = peUploadValidData;
        const requestEntity: any = {
          processId,
          ProcessVariables: {...data},
          workflowId,
          projectId,
        };
        const url =
        `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
        return this.httpService.post(url, requestEntity);
      }
      getCsvDataWithMessage(data) {
        const piCsvDataWithMessage = this.apiService.api.peCsvDataWithMessage;
        const { processId, projectId, workflowId } = piCsvDataWithMessage;
        const requestEntity: any = {
          processId,
          ProcessVariables: {...data},
          workflowId,
          projectId,
        };

        const url =
        `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

        return this.httpService.post(url, requestEntity);
      }
}
