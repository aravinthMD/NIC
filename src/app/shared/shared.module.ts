import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AuditTrailDialogComponent } from './audit-trail-dialog/audit-trail-dialog.component';
import {MaterialModule} from './material/material.module'
import { RemarkModalComponent } from './remark-modal/remark-modal.component';
import { MatDatepickerModule, MatToolbarModule } from '@angular/material';
import { UserInfoFormComponent } from './preview/user-info-form/user-info-form.component';
import { DataSavedModalComponent } from './data-saved-modal/data-saved-modal.component';
import { ViewInfoComponent } from './view-info/view-info.component';
import { BorderDirective } from './border.directive';
import { SecurePipe } from './secure.pipe';
import { CsvUploadModalComponent } from '../protectedPages/csv-upload-modal/csv-upload-modal.component';
import { SideNavComponent } from '../protectedPages/side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { ProjectExecutionFormModalComponent } from './project-execution-form-modal/project-execution-form-modal.component';
import { PreviewPopupComponent } from './preview-popup/preview-popup.component';
import { TaxInvoiceFormComponent } from './tax-invoice-form/tax-invoice-form.component';
import { SharedProfomaInvoiceComponent } from './shared-profoma-invoice/shared-profoma-invoice.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedViewPdfComponent } from './shared-view-pdf/shared-view-pdf.component';
import { SharedSmsCreditAllocationComponent } from './shared-sms-credit-allocation/shared-sms-credit-allocation.component';


@NgModule({
  declarations: [
    CustomInputComponent, CustomSelectComponent, EmailModalComponent, AccountHeaderComponent,AuditTrailDialogComponent, RemarkModalComponent,UserInfoFormComponent, DataSavedModalComponent,
     ViewInfoComponent, BorderDirective, SecurePipe,
    CsvUploadModalComponent, SideNavComponent, HeaderComponent, ProjectExecutionFormModalComponent, PreviewPopupComponent, TaxInvoiceFormComponent,
    CsvUploadModalComponent, SideNavComponent, HeaderComponent, SharedProfomaInvoiceComponent, SharedViewPdfComponent, SharedSmsCreditAllocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatToolbarModule,
    NgMultiSelectDropDownModule
    
  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent,
    EmailModalComponent,
    AccountHeaderComponent,
    RemarkModalComponent,
    UserInfoFormComponent,
    DataSavedModalComponent,
    ViewInfoComponent,
    SecurePipe,
    CsvUploadModalComponent,
    SideNavComponent,
    HeaderComponent,
    ProjectExecutionFormModalComponent,
    TaxInvoiceFormComponent,
    SharedProfomaInvoiceComponent,
    SharedSmsCreditAllocationComponent
  ],
  providers : [DatePipe],
  entryComponents : [AuditTrailDialogComponent,PreviewPopupComponent]
})
export class SharedModule { }
