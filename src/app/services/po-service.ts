import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class POService {
    private departmentList = [];
    private statusList = [];
    private paymentList = [];
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