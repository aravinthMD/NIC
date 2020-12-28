import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiService  : ApiService,private httpService : HttpClient) { }

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
        proformaInvoiceNumber : form.proformaInvoiceNumber,
        proformaInvoiceDate : form.proformaInvoiceDate,
        amount : form.amount,
        paymentMode : form.paymentMode,
        documentNumber : form.documentNumber,
        transactionDate : form.transactionDate,
        branchName : form.branchName,
        receivedAmount : form.receivedAmount,
        tds : form.tds,
        nicsiProjectNumber : form.nicsiProjectNumber,
        paidPI : form.paidPI,
        remark  :form.remark,
        uploadDocument : form.uploadDocument
      }

      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }

      const body = {
        processVariables : JSON.stringify(requestEntity)
      };

      const formData = this.transform(body)

      let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
      return  this.httpService.post<any>(url,formData);
  }

  getProjectExecutionDetails(invoiceNumber : any){

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

    selectedInvoiceNumber  : invoiceNumber

  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body);

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

  }


  getProjectExecutionDetailbyId(currentPEId : any){
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
        currentPEId  : currentPEId,
        temp : 'get'
       }


       const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }
    
      const body = {
        processVariables : JSON.stringify(requestEntity)
      };
    
      const formData = this.transform(body);
    
      let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
      return  this.httpService.post<any>(url,formData);
    
       
        }


        updateProjectExecutionDetail(form  :any){

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

        currentPEId : form.currentPEId,
        userName : form.userName,
        invoiceNumber : form.invoiceNumber,
        amount : form.amount,
        invoiceDate  :form.invoiceDate,
        paymentMode : form.paymentMode,
        documentNumber : form.documentNumber,
        transactionDate : form.transactionDate,
        branchName : form.branchName,
        receivedAmount : form.receivedAmount,
        tds : form.tds,
        nicsiProjectNumber  : form.nicsiProjectNumber,
        paidPI : form.paidPI,
        remark : form.remark,
        uploadDocument : form.uploadDocument,
        temp : form.temp
      }


      
      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }
    
      const body = {
        processVariables : JSON.stringify(requestEntity)
      };
    
      const formData = this.transform(body);
    
      let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
      return  this.httpService.post<any>(url,formData);
    

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
  
    const body = {
      processVariables : JSON.stringify(requestEntity)
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
    return  this.httpService.post<any>(url,formData);

  }

  fetchAllProformaInvoice(){  

    const {
      api : {
        fetchAllProformaInvoice : {
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
  
    const body = {
      processVariables : JSON.stringify(requestEntity)
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
    return  this.httpService.post<any>(url,formData);
  
    
  }
  
  
  createProformaInvoice(form : any){

    const {
      api : {
        createProformaInvoice : {
            workflowId,
            processId,
            projectId
        }
      }
  } = this.apiService;

  const data = {

    AccountName : form.accountName,
    referenceNumber : form.refNumber,
    piNumber : form.invoiceNumber,
    owner : form.piOwner,
    piAmount : form.piAmount,
    traffic : form.piTraffic,
    date : form.date,
    nicsiManager : form.nicsiManager,
    startDate : form.startDate,
    endDate : form.endDate,
    piStatus : form.piStatus,
    paymentStatus : form.paymentStatus,
    remark : form.remark,
    uploadDocument : form.uploadDocument

  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

  }

  getProformaInvoiceDetailById(proformaInvoiceId : string){

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
    currentPIId  : proformaInvoiceId,
    temp : "get"

  }

  const requestEntity  : any  = {
    processId,
    ProcessVariables : data,
    projectId
  }

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

  }

  updateProformaInvoice(form : any){

      const {
        api : {
          updateProformaInvoice : {
            workflowId,
            processId,
            projectId
         }
        }
      } = this.apiService;

      const data = {
        AccountName : form.AccountName,
        referenceNumber : form.referenceNumber,
        piNumber : form.piNumber,
        ReferenceNumber : form.ReferenceNumber,
        piAmount : form.piAmount,
        Owner : form.Owner,
        currentPIId : form.currentPIId,
        Traffic : form.Traffic,
        piDate : form.piDate,
        NICSIManager : form.NICSIManager,
        remark : form.remark,
        uploads : form.uploads,
        startDate : form.startDate,
        endDate  : form.endDate,
        piStatus : form.piStatus,
        paymentStatus  : form.paymentStatus,
        temp : form.temp,
        selectedPIId : form.selectedPIId
      }

      const requestEntity  : any  = {
        processId,
        ProcessVariables : data,
        projectId
      }

      const body = {
        processVariables : JSON.stringify(requestEntity)
      };

      const formData = this.transform(body)

      let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
      return  this.httpService.post<any>(url,formData);
  }
  



  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }

}
