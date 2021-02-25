import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveUserComponent } from './active-user/active-user.component';
import { ApproveSmsComponent } from './approve-sms/approve-sms.component';


const routes: Routes = [
{
  path:'smsappove/:requestId',
  component: ApproveSmsComponent
},
{
  path:'active-user/:customerId',
  component: ActiveUserComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalRoutingModule { }
