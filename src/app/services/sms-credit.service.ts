import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SmsCreditAllocation } from '../protectedPages/user-information/user-info/sms-credit-allocation/sms-credit.model';

@Injectable({
  providedIn: 'root',
})
export class SmsCreditService {
  private STATUS_LIST = [
    { key: '0', value: 'Pending' },
    { key: '1', value: 'Approved' },
    { key: '2', value: 'Rejected' },
  ];

  private SMS_QUOTA_MATRIX = [
    { key: '0', value: 'arpita.burman@nic.in' },
    { key: '1', value: 'dureja.sk@nic.in' },
    { key: '2', value: 'sshanker@nic.in' },
    { key: '3', value: 'pradeep.garg@nic.in' },
  ];

  constructor(
    private httpService: HttpService,
    private apiService: ApiService
  ) {}

  getStatusListLov() {
    return this.STATUS_LIST;
  }

  getSmsQuotaMatrix() {
    return this.SMS_QUOTA_MATRIX;
  }

  getCreditSmsList(data) {
    const creditSmsList = this.apiService.api.getSmsCreditAllocationData;
    const { processId, projectId, workflowId } = creditSmsList;
    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };

    
    const url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;

    return this.httpService.post(url, requestEntity);
  }



  saveOrUpdateSmsCreditDetails(data: SmsCreditAllocation) {

    const creditSmsList = this.apiService.api.saveOrUpdateSmsCredit;
    const { processId, projectId, workflowId } = creditSmsList;
    const requestEntity: any = {
      processId,
      ProcessVariables: data,
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
