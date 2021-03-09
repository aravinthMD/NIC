import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CsvUploadService {
  constructor(
    private apiService: ApiService,
    private httpService: HttpService
  ) {}
  uploadCsv(data) {
    const dashboardDetails = this.apiService.api.piCsvUpload;
    const { processId, projectId, workflowId } = dashboardDetails;
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
    const dashboardDetails = this.apiService.api.piUploadValidData;
    const { processId, projectId, workflowId } = dashboardDetails;
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
    const piCsvDataWithMessage = this.apiService.api.piCsvDataWithMessage;
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
