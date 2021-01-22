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

    const formData = this.transform(body)

    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
    return  this.httpService.post<any>(url,formData);
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
  
    const body = {
      processVariables : JSON.stringify(requestEntity)
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
    return  this.httpService.post<any>(url,formData);
  
    
  }
  

    

fetchAllPO(currentPage?:any) {

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
                currentPage: Number(currentPage)
              },
              projectId
            }
        }else {
              requestEntity = {
                processId,
                ProcessVariables : {},
                projectId
              }
        }
          
        const body = {
          processVariables : JSON.stringify(requestEntity)
        };

        const formData = this.transform(body)

        let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
        return  this.httpService.post<any>(url,formData);

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

      const body = {
        processVariables : JSON.stringify(requestEntity)
      };

      const formData = this.transform(body)

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

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

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

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);

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

  const body = {
    processVariables : JSON.stringify(requestEntity)
  };

  const formData = this.transform(body)

  let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  return  this.httpService.post<any>(url,formData);
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
  
    const body = {
      processVariables: JSON.stringify(requestEntity),
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  
    return this.httpService.post(url,formData);
  
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
  
    const body = {
      processVariables: JSON.stringify(requestEntity),
    };
  
    const formData = this.transform(body);
  
    let url = `${environment.host}d/workflows/${processId}/execute?projectId=${projectId}`;
  
    return this.httpService.post(url,formData);

  }
  

  transform(data: any) {
    return new HttpParams({ fromObject: data });
  }

}
