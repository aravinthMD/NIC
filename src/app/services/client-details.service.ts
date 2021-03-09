import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientDetailsService {
    private clientId: string;
    private clientStatus: boolean;
    private manageEmailList : any[] = [
        {
           "id" : 1,
           "screen" : "Customer Details",
           "screenStatus" : "0"
        },
        {
           "id" : 2,
           "screen" : "Technical Admin",
           "screenStatus" : "0"
        },
        {
           "id" : 3,
           "screen" : "Billing Admin",
           "screenStatus" : "0"
        },
        {
           "id" : 4,
           "screen" : "SMS Credit Allocation",
           "screenStatus" : "0"
        },
        {
           "id" : 5,
           "screen" : "Proforma Invoice",
           "screenStatus" : "1"
        },
        {
           "id" : 6,
           "screen" : "Project Execution",
           "screenStatus" : "1"
        },
        {
           "id" : 7,
           "screen" : "Purchase Order",
           "screenStatus" : "0"
        },
        {
           "id" : 8,
           "screen" : "Tax Invoice",
           "screenStatus" : "0"
        },
        {
           "id" : 9,
           "screen" : "Reports",
           "screenStatus" : "0"
        },
        {
           "id" : 10,
           "screen" : "Email",
           "screenStatus" : "0"
        }
     ];

    setClientId(id: string) {
        this.clientId = id;
    }

    getClientId() {
        return this.clientId;
    }


    setManageEmailList(list : any[]){
        this.manageEmailList = list
    }

    getManageEmailList(){
        return this.manageEmailList;
    }

    setClientStatus(status: boolean) {
       this.clientStatus = status;
    }

    getClientStatus() {
       return this.clientStatus;
    }
}
