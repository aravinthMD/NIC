import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  detectSidNav$: BehaviorSubject<string> = new BehaviorSubject('');
  clearDirty$: BehaviorSubject<string> = new BehaviorSubject('');
  userDetails$:BehaviorSubject<string> = new BehaviorSubject<any>({});
  techAdminUserDetails$:BehaviorSubject<string> = new BehaviorSubject<any>({});
  billAdminUserDetails$:BehaviorSubject<string> = new BehaviorSubject<any>({});


    
    setCurrentUrl(data) {
        this.detectSidNav$.next(data)
    }

    
    setClearDirty(data) {
        this.clearDirty$.next(data)
    }

    projectNumber$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setProjectNumber(data) {
        this.projectNumber$.next(data)
    }

    
  setUserDetails(data) {
        this.userDetails$.next(data)
  }

  setTechAdminUserDetails(data) {
    this.techAdminUserDetails$.next(data)
 }

 setBillAdminUserDetails(data) {
  this.billAdminUserDetails$.next(data)
}
  
   

    getDownloadXlsFile(tabledata:any[],type?:string){
      
      if(type==='TaxInvoice'){
        tabledata = tabledata.map(obj=> {
          return {
            TaxInvoiceNo: obj.invoiceNo,
            TaxInvoiceAmount: obj.piAmt,
            Remarks:obj.remarks,
            ProjectNo:obj.projectNumber
           };
       });
      }else if(type==='ProjectExecution'){
        tabledata = tabledata.map(obj=> {
          return {       
            ProjectNo: obj.projectNo,
            ProformainvoiceNo: obj.invoiceNumber,
            ProformainvoiceDate:obj.invoiceDate,
            Amount:obj.amount
           };
       });
        }else if(type==='PurchaseOrder'){
        tabledata = tabledata.map(obj=> {
          return {       
            PurchaseOrderNo: obj.purchaseNo,
            ProjectNo: obj.projectNumber,
            PoAmount:obj.piAmt,
            Reminder:obj.reminder
           };
       });
       }else if(type==='ProformaInvoice'){
        tabledata = tabledata.map(obj=> {
          return {       
            ProformainvoiceNo: obj.invoiceNo,
            AccountName: obj.accountName,
            ProjectNo:obj.projectNumber,
            PiAmount:obj.piAmt,
            Remarks:obj.remarks,
           };
       });
      }else if(type==='Report_Payment_Track'){
        tabledata = tabledata.map(obj=> {
          return obj
       });
      }
    var headers =Object.keys(tabledata[0]);
     const csvrows=[];
    csvrows.push(headers.join(','));
    
    for(const row of tabledata){
      const val =headers.map(header=>{

        const rowdata=(''+row[header]).replace(/"/g,'\\"')
        return `"${rowdata}"`
      });
     csvrows.push(val.join(','));
    }
    const data=csvrows.join('\n'); 
    const blob=new Blob([data],{type:'text/csv'});
    const url=window.URL.createObjectURL(blob);
    const a= document.createElement('a');
    a.setAttribute('hidden','');
    a.setAttribute('href',url);
    a.setAttribute('download','download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);    
      }


  constructor() { }
}
