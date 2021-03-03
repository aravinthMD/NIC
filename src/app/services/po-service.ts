import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiService } from '@services/api.service';
import { HttpService } from '@services/http.service';
@Injectable({
    providedIn: 'root'
})
export class POService {
    private departmentList = [];
    private statusList = [
        { key :0, value: 'Received' },
    { key :1,value : 'Not Received'},
    { key :2,value : 'Raised'},
    { key: 3, value: 'Pending' },
    { key: 4, value: 'Rejected' },
    { key: 5, value: 'On Hold' }]
    private paymentList = [{ key : "3",value : 'Received' }];
    private poData;
    constructor(
        private apiService: ApiService,
        private httpService: HttpService
    ) {}

    setDepartmentList(data) {
        this.departmentList = data;
    }

    getDepartmentList() {
        return this.departmentList;
    }

    setStatusList(data) {
        this.statusList = data;
    }

    getStatusList() {
        return this.statusList;
    }

    setPaymentList(data) {
        this.paymentList = data;
    }

    getPaymentList() {
        return this.paymentList;
    }

    setPoData(data) {
        this.poData = data;
    }

    getPoData() {
        return this.poData;
    }

    getCsvData(data) {
        const dashboardDetails = this.apiService.api.poCsvAPI;
        const { processId, projectId, workflowId } = dashboardDetails;
        const requestEntity: any = {
          processId,
          ProcessVariables: {
              ...data
          },
          workflowId,
          projectId,
        };
        const url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
        return this.httpService.post(url, requestEntity);
    }

    uploadCsv(data) {
        const dashboardDetails = this.apiService.api.poCsvUpload;
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
        const dashboardDetails = this.apiService.api.poUploadValidData;
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
        const piCsvDataWithMessage = this.apiService.api.poCsvDataWithMessage;
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

