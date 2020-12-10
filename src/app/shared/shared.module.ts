import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AuditTrailDialogComponent } from './audit-trail-dialog/audit-trail-dialog.component';
import {MaterialModule} from './material/material.module'
import { RemarkModalComponent } from './remark-modal/remark-modal.component';
import { MatDatepickerModule } from '@angular/material';

@NgModule({
  declarations: [CustomInputComponent, CustomSelectComponent, EmailModalComponent, AccountHeaderComponent,AuditTrailDialogComponent, RemarkModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,

  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent,
    EmailModalComponent,
    AccountHeaderComponent,
    RemarkModalComponent
  ],
  providers : [],
  entryComponents : [AuditTrailDialogComponent]
})
export class SharedModule { }
