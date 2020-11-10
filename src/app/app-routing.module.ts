import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './protectedPages/admin/admin.component';
import { CreateUserComponent } from './protectedPages/admin/create-user/create-user.component';
import { ManageUsersComponent } from './protectedPages/admin/manage-users/manage-users.component';
import { DashboardComponent } from './protectedPages/dashboard/dashboard.component';
import { ProtectedComponent } from './protectedPages/protected/protected.component';
import { ReportsComponent } from './protectedPages/reports/reports.component';
import { UserInformationComponent } from './protectedPages/user-information/user-information.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { ManageAdminComponent } from './protectedPages/admin/manage-admin/manage-admin.component';
import { EmailComponent } from './protectedPages/email/email.component';
import { AccountManageComponent } from './protectedPages/admin/account-manage/account-manage.component'
import { ProcessDetailsComponent } from './protectedPages/user-information/process-details/process-details.component';

import { PurchaseEntryComponent } from './protectedPages/user-information/purchase-entry/purchase-entry.component';
import { PurchaseOrderComponent } from './protectedPages/user-information/purchase-order/purchase-order.component';
import { TaxInvoiceComponent } from './protectedPages/user-information/tax-invoice/tax-invoice.component';

import  { TechnicalAdminDetailsComponent } from './protectedPages/user-information/user-info/technical-admin-details/technical-admin-details.component'

import  { BillingOwnerDetailsComponent } from './protectedPages/user-information/user-info/billing-owner-details/billing-owner-details.component'


import  { SmsCreditAllocationComponent } from './protectedPages/user-information/user-info/sms-credit-allocation/sms-credit-allocation.component'

import  { UserInfoComponent } from './protectedPages/user-information/user-info/user-info.component'

const routes: Routes = [
  {path:"",component :LoginComponent},
  {path:"resetpassword",component : ResetPasswordComponent},
  {path:"verifyotp",component:GenerateOtpComponent},
  {path : "users",component : ProtectedComponent,
  children : [
    { path : "Dashboard" , component : DashboardComponent },
    { path : "userInfo/:id" , component : UserInformationComponent },
    { path : "userInfo" , component : UserInformationComponent },
    { path : "reports" , component : ReportsComponent},
    {path: 'customerDetails',component: UserInfoComponent},
    {path: 'techAdmin',component: TechnicalAdminDetailsComponent},
    {path: 'billingAdmin',component: BillingOwnerDetailsComponent},
    {path: 'smsCredit',component: SmsCreditAllocationComponent},

    {path:'proformaInvoice', component: ProcessDetailsComponent},
    {path:'projectExecution', component: PurchaseEntryComponent},
    {path:'purchaseOrder', component: PurchaseOrderComponent},
    {path:'taxInvoice', component: TaxInvoiceComponent},



    {path: "email", component : EmailComponent}
  ],
},
  {path:"admin",component : AdminComponent,
  children : [
    {path: "manageUser", component: ManageAdminComponent},
    { path : "createuser",component : CreateUserComponent},
    { path : "manageAccount",component : AccountManageComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
