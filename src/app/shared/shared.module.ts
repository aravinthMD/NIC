import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { AccountHeaderComponent } from './account-header/account-header.component';

@NgModule({
  declarations: [CustomInputComponent, CustomSelectComponent, EmailModalComponent, AccountHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent,
    EmailModalComponent,
    AccountHeaderComponent
  ]
})
export class SharedModule { }
