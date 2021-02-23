import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveSmsComponent } from './approve-sms/approve-sms.component';


const routes: Routes = [
{
  path:'smsappove/:requestId',
  component: ApproveSmsComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalRoutingModule { }
