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

import { ProjectExecutionComponent } from './protectedPages/user-information/project-execution/project-execution.component';
import { PurchaseOrderComponent } from './protectedPages/user-information/purchase-order/purchase-order.component';
import { TaxInvoiceComponent } from './protectedPages/user-information/tax-invoice/tax-invoice.component';

import  { TechnicalAdminDetailsComponent } from './protectedPages/user-information/user-info/technical-admin-details/technical-admin-details.component'

import  { BillingOwnerDetailsComponent } from './protectedPages/user-information/user-info/billing-owner-details/billing-owner-details.component'


import  { SmsCreditAllocationComponent } from './protectedPages/user-information/user-info/sms-credit-allocation/sms-credit-allocation.component'

import  { UserInfoComponent } from './protectedPages/user-information/user-info/user-info.component'
import { ManageGroupComponent } from './protectedPages/email/manage-group/manage-group.component';

import { LoaderService } from '@services/loader.service'
import { LovsComponent } from './protectedPages/admin/lovs/lovs.component';
import { DefineRolesComponent } from './protectedPages/admin/define-roles/define-roles.component';
import { ManageEmailComponent } from './protectedPages/admin/manage-email/manage-email.component';
import { LovResolverService } from '@services/lov-resolver.service';

const routes: Routes = [
  {
    path:"",
    component :LoginComponent
  },
  {
    path:"resetpassword",
    component : ResetPasswordComponent
  },
  {
    path:"verifyotp",
    component:GenerateOtpComponent
  },
  {
    path : "users",
    component : ProtectedComponent,
    resolve :  { listOfValue : LovResolverService },
  children : [
    { 
      path : "Dashboard" ,
       component : DashboardComponent
     },
    { 
      path : "userInfo" , 
      component : UserInformationComponent,
    },
    { 
      path : "customerDetails/:id" , 
      component : UserInfoComponent,
    },
    {
      path: 'customerDetails',
      component: UserInfoComponent,
    },
    {
      path: 'techAdmin',
      component: TechnicalAdminDetailsComponent,
    },
    {
      path: 'techAdmin/:id',
      component: TechnicalAdminDetailsComponent,
    },
    {
      path: 'billingAdmin',
      component: BillingOwnerDetailsComponent,
    },
    {
      path: 'billingAdmin/:id',
      component: BillingOwnerDetailsComponent,
    },
    {
      path: 'smsCredit',
      component: SmsCreditAllocationComponent,
    },
    {
      path: 'smsCredit/:id',
      component: SmsCreditAllocationComponent,
    },

    {
      path:'proformaInvoice', 
      component: ProcessDetailsComponent,
    },
    {
      path:'proformaInvoice/:projectNo', 
      component: ProcessDetailsComponent,
    },
    {
      path:'projectExecution', 
      component: ProjectExecutionComponent,
    },
    {
      path:'projectExecution/:projectNo', 
      component: ProjectExecutionComponent,
    },
    {
      path:'purchaseOrder', 
      component: PurchaseOrderComponent,
    },
    {
      path:'purchaseOrder/:projectNo', 
      component: PurchaseOrderComponent,
    },
    {
      path:'taxInvoice', 
      component: TaxInvoiceComponent,
    },
    {
      path:'taxInvoice/:projectNo', 
      component: TaxInvoiceComponent,
    },


    { path : "reports" , 
    component : ReportsComponent,
  },
    {
      path: "sendemail", 
      component : EmailComponent,
    },
    {
      path: "managegroup", 
      component : ManageGroupComponent,
    }
  ],
},
  {
    path:"admin",
    component : AdminComponent,
    resolve :  { listOfValue : LovResolverService },
    children : [
      {
        path: "manageUser", 
        component: ManageAdminComponent
      },
      { 
        path : "createuser",
        component : CreateUserComponent
      },
      { 
        path : "manageAccount",
        component : AccountManageComponent
      },
      {
        path :  "manageUsers",
        component :  ManageUsersComponent
      },
      {
        path :  "managelovs",
        component :  LovsComponent
      },
      {
        path : "manageRoles",
        component : DefineRolesComponent
      },
      {
        path :  "manageEmail",
        component : ManageEmailComponent
      }
    ]},
    {
      path : "**",redirectTo : "/",
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
