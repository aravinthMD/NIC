import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSlideToggleModule, MatSortModule, MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MaterialModule } from "src/app/shared/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ProcessDetailsComponent } from "../user-information/process-details/process-details.component";
import { ProformaInvoiceDialogFormComponent } from "../user-information/process-details/proforma-invoice-dialog-form/proforma-invoice-dialog-form.component";
import { ProjectExecutionComponent } from "../user-information/project-execution/project-execution.component";
import { PurchaseOrderComponent } from "../user-information/purchase-order/purchase-order.component";
import { TaxInvoiceComponent } from "../user-information/tax-invoice/tax-invoice.component";
import { BillingOwnerDetailsComponent } from "../user-information/user-info/billing-owner-details/billing-owner-details.component";
import { SmsCreditAllocationComponent } from "../user-information/user-info/sms-credit-allocation/sms-credit-allocation.component";
import { TechnicalAdminDetailsComponent } from "../user-information/user-info/technical-admin-details/technical-admin-details.component";
import { UserInfoComponent } from "../user-information/user-info/user-info.component";
import { UserInformationComponent } from "../user-information/user-information.component";
import { ProtectedRoutingModule } from "./protected-routing.module";
import { ProtectedComponent } from "./protected.component";

@NgModule({
    declarations:[
        ProtectedComponent,
        UserInformationComponent,
        UserInfoComponent,
        TechnicalAdminDetailsComponent,
        BillingOwnerDetailsComponent,
        SmsCreditAllocationComponent,
        ProcessDetailsComponent,
        ProjectExecutionComponent,
        PurchaseOrderComponent,
        TaxInvoiceComponent,
        
    ],
    imports:[
        CommonModule,
        ProtectedRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,       
        ScrollingModule,
        SharedModule,      
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule, 
        MatSlideToggleModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatSortModule,
        MatToolbarModule, 
        NgMultiSelectDropDownModule       
    ],
    exports:[]
})
export class ProtectedModule{}