import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthguardService } from "@services/authguard.service";
import { CustomerDetailsResolver } from "@services/customer-details.resolver.service";
import { LovResolverService } from "@services/lov-resolver.service";
import { BulkUploadComponent } from "../bulk-upload/bulk-upload.component";
import { EmailComponent } from "../email/email.component";
import { ManageGroupComponent } from "../email/manage-group/manage-group.component";
import { ProcessDetailsComponent } from "../user-information/process-details/process-details.component";
import { ProjectExecutionComponent } from "../user-information/project-execution/project-execution.component";
import { PurchaseOrderComponent } from "../user-information/purchase-order/purchase-order.component";
import { TaxInvoiceComponent } from "../user-information/tax-invoice/tax-invoice.component";
import { BillingOwnerDetailsComponent } from "../user-information/user-info/billing-owner-details/billing-owner-details.component";
import { SmsCreditAllocationComponent } from "../user-information/user-info/sms-credit-allocation/sms-credit-allocation.component";
import { TechnicalAdminDetailsComponent } from "../user-information/user-info/technical-admin-details/technical-admin-details.component";
import { UserInfoComponent } from "../user-information/user-info/user-info.component";
import { UserInformationComponent } from "../user-information/user-information.component";
import { ProtectedComponent } from "./protected.component";


const routes: Routes = [
  // {
  //   path:'',
  //   component:ProtectedComponent,
  //   resolve :  { 
  //     listOfValue : LovResolverService,
  //     customerResolver: CustomerDetailsResolver  },
  //   canActivate: [AuthguardService],
  //   children:[
  //     { 
  //       path : "userInfo" , 
  //       component : UserInformationComponent,
  //     },
  //     {
  //       path: 'customerDetails',
  //       component: UserInfoComponent,
  //     }
  //   ]
  // },
  {
    path:'',
    component:ProtectedComponent,
    resolve :  { 
      listOfValue : LovResolverService,
      customerResolver: CustomerDetailsResolver  },
    canActivate: [AuthguardService],
    children : [
        // { 
        //   path : "Dashboard" ,
        //   component : DashboardComponent
        // },
       
        { 
          path : "customerDetails/:id" , 
          component : UserInfoComponent,
        },
        {
          path: 'customerDetails',
          component: UserInfoComponent,
        },
        // {
        //   path: 'techAdmin',
        //   component: TechnicalAdminDetailsComponent,
        // },
        {
          path: 'techAdmin/:id',
          component: TechnicalAdminDetailsComponent,
        },
        // {
        //   path: 'billingAdmin',
        //   component: BillingOwnerDetailsComponent,
        // },
        {
          path: 'billingAdmin/:id',
          component: BillingOwnerDetailsComponent,
        },
        // {
        //   path: 'smsCredit',
        //   component: SmsCreditAllocationComponent,
        // },
        {
          path: 'smsCredit/:id',
          component: SmsCreditAllocationComponent,
        },
  
        // {
        //   path:'proformaInvoice', 
        //   component: ProcessDetailsComponent,
        // },
        {
          path:'proformaInvoice/:id', 
          component: ProcessDetailsComponent,
        },
        // {
        //   path:'projectExecution', 
        //   component: ProjectExecutionComponent,
        // },
        {
          path:'projectExecution/:id', 
          component: ProjectExecutionComponent,
        },
        // {
        //   path:'purchaseOrder', 
        //   component: PurchaseOrderComponent,
        // },
        {
          path:'purchaseOrder/:id', 
          component: PurchaseOrderComponent,
        },
        // {
        //   path:'taxInvoice', 
        //   component: TaxInvoiceComponent,
        // },
        {
          path:'taxInvoice/:id', 
          component: TaxInvoiceComponent,
        },
  
  
        // {
        //   path: "sendemail", 
        //   component : EmailComponent,
        // },
        // {
        //   path: "managegroup", 
        //   component : ManageGroupComponent,
        // },
        // {
        //   path: 'bulk-upload',
        //   component: BulkUploadComponent
        // }
      ],
}, 
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProtectedRoutingModule{}