import { Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class PiService {

  constructor(private invoiceService : InvoiceService,
              private toasterService : ToasterService) { }

  

  getAutoPopulatePI(clientId  :string) : any  {
      let proformaInvoicesList = [];
    this.invoiceService.getPIAutoPopulationAPI(clientId).subscribe(
      (response) =>{
        console.log(`API Response for the Get PI Auto Populate ${response}`);
        proformaInvoicesList = response['ProcessVariables']['piList'] || [];
        return proformaInvoicesList;
    },(error) =>{
        console.log('Error');
        this.toasterService.showError('Failed to fetch data','');
        return proformaInvoicesList;
    })
  }

}
