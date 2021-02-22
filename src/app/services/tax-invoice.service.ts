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
    private paymentList: any[];
    private invoiceStatusList = [];
    constructor(
        private httpService: HttpService,
        private apiService: ApiService
    ) {

    }

    setInvoiceStatusList(value = []) {
      this.invoiceStatusList = value;
    }

    getInvoiceStatusList() {
      return this.invoiceStatusList;
    }

    setPaymentList(value: any[]) {
        this.paymentList = value;
    }

    getPaymentList() {
      return this.paymentList;
    }


    getTaxInvoiceList(data) {
        const creditSmsList = this.apiService.api.fetchAllTaxInvoiceDetails;
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



      saveOrUpdateTaxInvoiceDetails(data: TaxInvoice) {

        const creditSmsList = this.apiService.api.saveOrUpdateTaxInvoice;
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

