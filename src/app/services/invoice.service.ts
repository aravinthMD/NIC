import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiService  : ApiService,
          private httpService : HttpService) { }

  createProjectExecution(form : any){
      const {
          api : {
            createProjectExecution : {
                workflowId,
                processId,
                projectId
            }
          }
      } = this.apiService;

      const data = {
        userName : form.userName,
        proformaInvoiceNumber : form.piNumber,
        proformaInvoiceDate : form.piDate,
        amount : form.piAmount,
        paymentMode : form.modeOfPayment,
        documentNumber : form.documentNo,
        transactionDate : form.dateOfTransaction,
        branchName : form.bankName,
        receivedAmount : form.amountReceived,
        tds : form.tds,
        nicsiProjectNumber : form.NICSIProjectNo,
        paidPI : form.piPaid,
        remark  :form.remark,
        upload_document : form.upload_document,
        userId  :form.userId
      }

      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }

     

      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
      return  this.httpService.post(url,requestEntity);
  }

  getProjectExecutionDetails(currentPage : any,selectedClientId : any){

    const {
      api : {
        getProjectExecutionDetailsList : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    selectedClientId,
    currentPage 
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }


  getProjectExecutionDetailbyId(id : number){
        const {
             api : {
              getProjectExecutionDetailById : {
            workflowId,
            processId,
            projectId
          }
        }
       } = this.apiService;

       const data = {
        id,
       }


       const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }
    
      
    
      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
      return  this.httpService.post(url,requestEntity);
    
       
        }


  updateProjectExecutionDetail(data  :any){

          const {
            api : {
              updateProjectExecutionDetail : {
           workflowId,
           processId,
           projectId
         }
       }
      } = this.apiService;

      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }
    
      
    
      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
      return  this.httpService.post(url,requestEntity);
      }


  deleteProjectExecution(invoiceNumber : string){

      const {
          api : {
            deleteProjectExecution : {
        workflowId,
        processId,
        projectId
   }
  }
    } = this.apiService;

    const data  = {
      invoiceNumber  : invoiceNumber
    }

    const requestEntity  : any  = {
      processId,
      ProcessVariables : data,
      projectId
    }
  
    
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
    return  this.httpService.post(url,requestEntity);

  }

  fetchAllProformaInvoice(currentPage:any,selectedClientId:string){  

    const {
      api : {
        fetchAllProformaInvoice : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

    const data = {
      currentPage,
      selectedClientId
    }

    const requestEntity  : any  = {
      processId,
      ProcessVariables : data,
      projectId
    }
  

    

    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
    return  this.httpService.post(url,requestEntity);
}

  createPurchaseOrder(data : any){
    const {
        api : {
          createPurchaseOrder : {
              workflowId,
              processId,
              projectId
          }
        }
    } = this.apiService;

   
    const requestEntity  : any  = {
      processId,
      ProcessVariables : data,
      projectId
    }
      
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
    return  this.httpService.post(url,requestEntity);
  
    
  }
  

    

fetchAllPO(selectedClientId : string,currentPage?:any) {

          const {
            api : {
              fetchPurchaseOrder : {
                  workflowId,
                  processId,
                  projectId
              }
            }
        } = this.apiService;


        let requestEntity  : any  = {};
        if(currentPage) {
              requestEntity = {
                processId,
              ProcessVariables : {
                selectedClientId,
                currentPage: Number(currentPage)
              },
              projectId
            }
        }else {
              requestEntity = {
                processId,
                ProcessVariables : {selectedClientId},
                projectId
              }
        }
          
        
        let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
        return  this.httpService.post(url,requestEntity);

}


updatePurchaseOrder(data) {

        const {
          api : {
            updatePurchaseOrder : {
                workflowId,
                processId,
                projectId
            }
          }
      } = this.apiService;


      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }
     

      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
      return  this.httpService.post(url,requestEntity);


}
  
  createProformaInvoice(data : any){

    const {
      api : {
        createProformaInvoice : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  
  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);
  }

  getProformaInvoiceDetailById(id : number){

    const {
      api : {
        getProformaInvoiceDetailById : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    id 
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }

  updateProformaInvoice(data : any){

      const {
        api : {
          updateProformaInvoice : {
            workflowId,
            processId,
            projectId
         }
        }
      } = this.apiService;

      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }

     

      let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
      return  this.httpService.post(url,requestEntity);
  }


  createTaxInvoice(form : any){

    const {
      api : {
        createTaxInvoice : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    userName : form.userName,
    projectNumber : form.projectNumber,
    poNumber : form.poNumber,
    poDate : form.poDate,
    fromDate : form.fromDate,
    toDate : form.toDate,
    billableAmount : form.billableAmount,
    InvoiceAmount : form.InvoiceAmount,
    TaxInvoiceNumber : form.TaxInvoiceNumber,
    submittedDate : form.submittedDate,
    InvoiceStatus : form.InvoiceStatus,
    InvoicePaidAmount : form.InvoicePaidAmount,
    tds : form.tds,
    penalty : form.penalty,
    shortPay : form.shortPay,
    paymentStatus : form.paymentStatus,
    remark : form.remark,
    projectName:form.projectName,
    projectCordinator : form.projectCordinator,
    PONoAmendOrder : form.PONoAmendOrder,
    mail : form.mail,
    totalSMS : form.totalSMS,
    counts : form.counts,
    baseAmount : form.baseAmount,
    tax : form.tax,
    recvDate:form.recvDate,
    book : form.book,
    dateEstimated : form.dateEstimated,
    invoiceAmount2 : form.invoiceAmount2,
    bankReceived : form.bankReceived,
    interestOnTDSotherDeduction : form.interestOnTDSotherDeduction,
    receiptDate : form.receiptDate,
    uploadDoc : form.uploadDocument
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }


  getTaxInvoiceDetails(){

    const {
      api : {
        getTaxInvoiceDetails : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {}

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

 

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }

  getTaxInvoiceDetailById(currentTiId ?: string){

    const {
      api : {
        getTaxInvoiceDetailById : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    currentTiId ,
    temp : "get"
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

 

  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);
  }


  // creating sms credit allocation

  smsCreditAllocationDetails(data) {

    const processId = this.apiService.api.smsCreditAllocation.processId;
    const workflowId = this.apiService.api.smsCreditAllocation.workflowId;
    const projectId = this.apiService.api.smsCreditAllocation.projectId;
  
  
    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };
  
    
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  
    return this.httpService.post(url,requestEntity);
  
  }

  updateTaxInvoice(data) {

    const processId = this.apiService.api.updateTaxnvoice.processId;
    const workflowId = this.apiService.api.updateTaxnvoice.workflowId;
    const projectId = this.apiService.api.updateTaxnvoice.projectId;
  
  
    const requestEntity: any = {
      processId,
      ProcessVariables: data,
      workflowId,
      projectId,
    };
  
    
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  
    return this.httpService.post(url,requestEntity);

  }


  getPIAutoPopulationAPI(clientId : string){

      const {
        api : {
          PIonLoadAPI : {
              workflowId,
              processId,
              projectId
          }
        }
    } = this.apiService;
  
    const data = {
      clientId
    }
  
    const requestEntity  : any  = {
      processId,
      ProcessVariables : data,
      projectId
    }
  
    
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
    return  this.httpService.post(url,requestEntity);
  
  }

  getProformaInvoiceOnChangeData(piNumber : number){
      
    const {
      api : {
        PIonChangeAPI : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    piNumber
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  
  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);

  }

  getTaxInvoiceOnLoad(clientId : number,piNumber ?: string){
      
    const {
      api : {
        TIonLoadAPI : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    clientId,
    piNumber
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

 
  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);
  }

  updatePopupModal(data) {
    const dashboardDetails = this.apiService.api.poPopupModalDataUpdate;
    const { processId, projectId, workflowId } = dashboardDetails;
    const requestEntity: any = {
      processId,
      ProcessVariables: {
        ...data
      },
      workflowId,
      projectId,
    };
  
    let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  
    return this.httpService.post(url, requestEntity);
  }

  getTIOnChange(poNumber : string){
    
      
    const {
      api : {
        TIonChangeAPI : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {
    poNumber
  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  
  let url = `${environment.host}d/workflows/${requestEntity.workflowId}/${environment.apiVersion.api}execute?projectId=${requestEntity.projectId}`;
  return  this.httpService.post(url,requestEntity);
  
  }
  

  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }

}