import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    constructor(
        private httpService: HttpService,
        private apiService: ApiService
    ) {}

    getReportsLov(data = {}) {
        const reportsLov = this.apiService.api.getReportsLov;
        const { processId, projectId, workflowId } = reportsLov;
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

    getReportsGridValue(data: any) {
        const reportsGridValue = this.apiService.api.getReportsGridValue;
        const { processId, projectId, workflowId } = reportsGridValue;
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

    private transform(data: any) {
        return new HttpParams({ fromObject: data });
    }
}
