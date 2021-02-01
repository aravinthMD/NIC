import { Injectable } from '@angular/core';

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
    constructor() {}

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
}