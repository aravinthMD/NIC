import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AdminService } from './admin.service';
import { ClientDetailsService } from './client-details.service';
import { ToasterService } from './toaster.service';
import { UtilityService } from './utility.service';

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
  public lovData;

  private isCustomerModule = true;

  customerDetails: any;

  private dropDownSettings = {};

    getDropDownSetting(){

        this.dropDownSettings = {
          singleSelection: true,
          allowSearchFilter: true,
          clearSearchFilter : true,
          itemsShowLimit:5,
          enableCheckAll : true,
          idField : "id",
          textField : "name",
        }
        return this.dropDownSettings;
    }
    
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
       
    this.customerDetails = data;
        this.userDetails$.next(data);
        this.customerDetail$.next(data);
  }

  


  getUserDetails(){
    return this.userDetails$.value;
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
  this.customerDetails = data;
  // localStorage.setItem("currentCustomerDetailObject",JSON.stringify(data))
  this.customerDetail$.next(data);
}

getCustomerDetails(){
  return this.customerDetails;
  // return this.customerDetail$.value;
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

    uploadToAppiyoDrive(files : FileList) {

      return new Promise((resolve,reject)=> {
          let file = files ?  files.item(0) : null;
          if(!file)
          return this.toasterService.showError("No File to Upload",'');

          const userId : string = this.clientDetailService.getClientId();
          
          const modifiedFile = Object.defineProperty(file, "name", {
            writable: true,
            value: this.utitlityService.checkFileName(file["name"])
          });
          modifiedFile["name"] = userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];

        

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
                    this.toasterService.showSuccess('File Upload Success','');
                    resolve(output)
                }else{
                  uploadStatus = false;
                    documentUploadId = null;
                     const output =  {
                      uploadStatus,
                      documentUploadId
                    }
                    this.toasterService.showError('File Upload Failed','');
                    
                    resolve(output)
                }
        },
          error => {
            console.log('error', error);
            reject(error);
          })
  
  
      })
          
      }


  constructor(private adminService : AdminService,
              private toasterService : ToasterService,
              private clientDetailService : ClientDetailsService,
              private utitlityService : UtilityService) { }

  setLovData(data){
    this.lovData = data;    
  }

  getLovData(){
    return this.lovData;
  }

  setCustomerModuleFlag(flag : boolean){
    this.isCustomerModule = flag
  }

  getCustomerModuleFlag(){
    return this.isCustomerModule;
  }

  changeDateFormat(date) {

    const splitDate = date.split('/');
  
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
  
   }


}
