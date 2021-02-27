import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalRoutingModule } from './external-routing.module';
import { ApproveSmsComponent } from './approve-sms/approve-sms.component';
import { FormsModule } from '@angular/forms';
import { ActiveUserComponent } from './active-user/active-user.component';


@NgModule({
  declarations: [ ApproveSmsComponent, ActiveUserComponent],
  imports: [
    CommonModule,
    ExternalRoutingModule,
    FormsModule
  ]
})
export class ExternalModule { }
