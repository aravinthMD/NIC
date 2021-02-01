import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import RequestEntity from '@model/request.entity';

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
    
    const url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
   
    return this.httpService.post(url, requestEntity);
  }

  private transform(data: any) {
    return new HttpParams({ fromObject: data });
  }
}
