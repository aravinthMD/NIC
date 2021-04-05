import { EventEmitter, Injectable } from '@angular/core';
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
    private selectedInvoiceStatus : any;
    private selectedPaymentStatus : any;
    
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

    setSelectedInvoiceStatus(value){
      this.selectedInvoiceStatus = value;
    }

    getSelectedInvoiceStatus(){
      return this.selectedInvoiceStatus;
    }

    setSelectedPaymentStatus(value = {}){
      this.selectedPaymentStatus = value;
    }

    getSelectedPaymentStatus(){
      return this.selectedPaymentStatus;
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

      uploadCsv(data) {
        const tiCsvUpload = this.apiService.api.tiCsvUpload;
        const { processId, projectId, workflowId } = tiCsvUpload;
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
        const tiUploadValidData = this.apiService.api.tiUploadValidData;
        const { processId, projectId, workflowId } = tiUploadValidData;
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
        const tiCsvDataWithMessage = this.apiService.api.tiCsvDataWithMessage;
        const { processId, projectId, workflowId } = tiCsvDataWithMessage;
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

