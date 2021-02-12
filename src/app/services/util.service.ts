import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  detectSidNav$: BehaviorSubject<string> = new BehaviorSubject('');
  clearDirty$: BehaviorSubject<string> = new BehaviorSubject('');
  userDetails$:BehaviorSubject<string> = new BehaviorSubject<any>({});
  techAdminUserDetails$:BehaviorSubject<any> = new BehaviorSubject<any>({});
  billAdminUserDetails$:BehaviorSubject<any> = new BehaviorSubject<any>({});
  projectNumber$: BehaviorSubject<string> = new BehaviorSubject('');


  private customerDetail$:BehaviorSubject<any> =  new BehaviorSubject<any>({});

  public customerDetail:Observable<any> = this.customerDetail$.asObservable();

  private customerId$:BehaviorSubject<any> = new BehaviorSubject<string>('');

  public customerId:Observable<any> = this.customerId$.asObservable();
  


    
    setCurrentUrl(data) {
        this.detectSidNav$.next(data)
    }

    getCurrentUrl(){
        this.detectSidNav$.value;
    }

    setClearDirty(data) {
        this.clearDirty$.next(data)
    }

    setProjectNumber(data) {
        this.projectNumber$.next(data)
    }

    getProjectNumber(){
      this.projectNumber$.value;
    }

    
  setUserDetails(data) {
       
        
        this.userDetails$.next(data)
  }

  


  getUserDetails(){
    this.userDetails$.value;
  }


  setTechAdminUserDetails(data) {
    this.techAdminUserDetails$.next(data)
 }


 getTechAdminUserDetails(){
   this.techAdminUserDetails$.value
 }

 setBillAdminUserDetails(data) {
  this.billAdminUserDetails$.next(data)
}

getBillAdminUserDetails(){
  this.billAdminUserDetails$.value;
}

setCustomerDetails(data : any){
  localStorage.setItem("currentCustomerDetailObject",JSON.stringify(data))
  this.customerDetail$.next(data);
}

getCustomerDetails(){
  this.customerDetail$.value;
}

setCustomerId(id : string){
  localStorage.setItem("currentCustomerId",id);
  this.customerId$.next(id);
}

getCustomerId(){
  this.customerId$.value;
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


    // async uploadToAppiyoDrive(file : Blob) {
    //     let uploadStatus :boolean = false;
    //     let documentUploadId  = null;
    //    this.adminService.uploadToAppiyoDrive(file).subscribe((response) =>{
    //           if(response['ok']){
    //             uploadStatus = true;
    //               documentUploadId = response['info']['id'];
    //               return {
    //                 uploadStatus,
    //                 documentUploadId
    //               }
    //           }else{
    //             uploadStatus = false;
    //               documentUploadId = null;
    //               return {
    //                 uploadStatus,
    //                 documentUploadId
    //               }
    //           }
    //   })
    // }

    uploadToAppiyoDrive(file : Blob) {

      return new Promise((resolve,reject)=> {
  
          let uploadStatus :boolean = false;
          let documentUploadId  = null;
         this.adminService.uploadToAppiyoDrive(file).subscribe((response) =>{
                if(response['ok']){
                  uploadStatus = true;
                    documentUploadId = response['info']['id'];
                    const output =  {
                      uploadStatus,
                      documentUploadId
                    }
  
                    resolve(output)
                }else{
                  uploadStatus = false;
                    documentUploadId = null;
                     const output =  {
                      uploadStatus,
                      documentUploadId
                    }
  
                    resolve(output)
                }
        },
          error => {
            console.log('error', error);
            reject(error);
          })
  
  
      })
          
      }


  constructor(private adminService : AdminService) { }
}
