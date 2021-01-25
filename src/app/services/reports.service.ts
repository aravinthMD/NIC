import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {


    private SMS_CREDIT_LIST = [
        {value: 'Approved', key: '1'},
        {value: 'Rejected', key: '2'},
        {value: 'Pending', key: '3'}
    ];

    private PROFORMA_INVOICE_LIST = [
        {value: 'Valid', key: '1'},
        {value: 'Invalid', key: '2'},
        {value: 'Paid', key: '3'},
        {value: 'Unpaid', key: '4'},
        {value: 'PO generated ', key: '5'},
        {value: 'PO not generated', key: '6'}
    ];

    private PURCHASE_ORDER_LIST = [
        {value: 'Valid', key: '1'},
        {value: 'Invalid', key: '2'},
        {value: 'Invoice Raised', key: '3'},
        {value: 'Not Raised', key: '4'},
        {value: 'PO Claim Full', key: '5'},
        {value: 'PO Claim Partially', key: '6'},
        {value: 'PO Need to Amend', key: '7'},
        {value: 'PO Need Cancelled', key: '8'}
    ];

    private INVOICE_RAISED_LIST = [
        {value: 'Validated', key: '1'},
        {value: 'Pending for Validation', key: '2'},
        {value: 'On Hold', key: '3'},
        {value: 'Submitted to NIICSI', key: '4'},
        {value: 'Not Submitted to NICSI', key: '5'},
        {value: 'Paid', key: '6'},
        {value: 'Unpaid', key: '7'}
    ];

    private PAYMENT_STATUS_LIST = [
        {value: 'Received', key: '1'},
        {value: 'Pending', key: '2'}
    ];

    constructor(
        private httpService: HttpService,
        private apiService: ApiService
    ) {}


    getLovForReports(selectedReportValue = '') {

        const getLovForReports = this.apiService.api.getReportsLov;
        const { processId, projectId, workflowId } = getLovForReports;
        const requestEntity: any = {
        processId,
        ProcessVariables: {
            selectedReportValue
        },
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


   getStatusList(key: number) {
       if (key === 4) {
         return this.SMS_CREDIT_LIST;
       }

       if (key === 5) {
         return this.PROFORMA_INVOICE_LIST;
       }

       if (key === 6) {
           return this.PURCHASE_ORDER_LIST;
       }

       if (key === 7) {
           return this.INVOICE_RAISED_LIST;
       }

       if (key === 8) {
           return this.PAYMENT_STATUS_LIST;
       }

       return [];
   }

    exportCsv() {

    }

    private transform(data: any) {
        return new HttpParams({ fromObject: data });
    }

}
