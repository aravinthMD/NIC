import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiService,
              private httpService: HttpService) {}

  getDashboardDetails() {
    const dashboardDetails = this.apiService.api.fetchDashboardDetails;
    const { processId, projectId, workflowId } = dashboardDetails;
    const requestEntity: any = {
      processId,
      ProcessVariables: {},
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

  getCsvDataForDashboard(id) {
    let processId;
    let projectId;
    let workflowId;

    if (id === 'pi') {
      processId = 'bed48c9c614a11eb8c80727d5ac274b2';
      projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
      workflowId = 'b17e3f2e4aad11ebb81e727d5ac274b2';
    } else if (id === 'po') {
      processId = '3c653ba6617e11eb8c9c727d5ac274b2';
      projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
      workflowId = 'b17e3f2e4aad11ebb81e727d5ac274b2';
    } else if (id === 'invoicePending') {
      processId = 'f12049ea61f211eb8c9e727d5ac274b2';
      projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
      workflowId = 'b17e3f2e4aad11ebb81e727d5ac274b2';
    } else if (id === 'partialBill') {
      processId = 'f3dd864c621111eb8cbc727d5ac274b2';
      projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
      workflowId = 'b17e3f2e4aad11ebb81e727d5ac274b2';
    }

    const requestEntity: any = {
      processId,
      ProcessVariables: {},
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
}
