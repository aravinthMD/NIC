import { Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class PiService {

  constructor(private invoiceService : InvoiceService,
              private toasterService : ToasterService) { }

}
