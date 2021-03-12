import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CsvBulkUploadService {
  constructor(
    private apiService: ApiService,
    private httpService: HttpService
  ) {}


  getApiDetailsForCsvUpload(pageKey: string) {

    if (pageKey === '2') {
        return this.apiService.api.poCsvForBulkUpload;
    }

  }

  getApiDetailsForValidationMessage(pageKey: string) {
      if (pageKey === '2') {
          return this.apiService.api.poValidationMsgForBulkUpload;
      }
  }

  getApiDetailsForSaveCsvData(pageKey: string) {
      if (pageKey === '2') {
          return this.apiService.api.poSaveValidDataForBulkUpload;
      }
  }

  uploadCsv(pageKey: string, data: any) {
    const uploadCsv = this.getApiDetailsForCsvUpload(pageKey);
    const { processId, projectId, workflowId } = uploadCsv;
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

  uploadValidData(pageKey: string) {
    const dashboardDetails = this.getApiDetailsForSaveCsvData(pageKey);
    const { processId, projectId, workflowId } = dashboardDetails;
    const requestEntity: any = {
      processId,
      ProcessVariables: {},
      workflowId,
      projectId,
    };

    const url =
    `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

    return this.httpService.post(url, requestEntity);
  }

  getCsvDataWithMessage(pageKey: string) {
    const dataWithValidationMessage = this.getApiDetailsForValidationMessage(pageKey);
    const { processId, projectId, workflowId } = dataWithValidationMessage;
    const requestEntity: any = {
      processId,
      ProcessVariables: {},
      workflowId,
      projectId,
    };

    const url =
    `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

    return this.httpService.post(url, requestEntity);
  }
}
