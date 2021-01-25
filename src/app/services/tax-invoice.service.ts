import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { TaxInvoice } from '../protectedPages/user-information/tax-invoice/tax-invoice.model';


@Injectable({
    providedIn: 'root'
})
export class TaxInvoiceService {
    constructor(
        private httpService: HttpService,
        private apiService: ApiService
    ) {

    }

    getTaxInvoiceList(data) {
        const creditSmsList = this.apiService.api.getSmsCreditAllocationData;
        const { processId, projectId, workflowId } = creditSmsList;
        const requestEntity: any = {
          processId,
          ProcessVariables: data,
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



      saveOrUpdateTaxInvoiceDetails(data: TaxInvoice) {

        const creditSmsList = this.apiService.api.saveOrUpdateSmsCredit;
        const { processId, projectId, workflowId } = creditSmsList;
        const requestEntity: any = {
          processId,
          ProcessVariables: data,
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

