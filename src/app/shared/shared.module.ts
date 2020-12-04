import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { RemarkModalComponent } from './remark-modal/remark-modal.component';

@NgModule({
  declarations: [CustomInputComponent, CustomSelectComponent, EmailModalComponent, AccountHeaderComponent, RemarkModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent,
    EmailModalComponent,
    AccountHeaderComponent,
    RemarkModalComponent
  ]
})
export class SharedModule { }
