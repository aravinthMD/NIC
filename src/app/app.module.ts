import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protectedPages/protected/protected.component';
import { DashboardComponent } from './protectedPages/dashboard/dashboard.component';
import { SideNavComponent } from './protectedPages/side-nav/side-nav.component';
import { UserInformationComponent } from './protectedPages/user-information/user-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule } from 'src/app/shared/material/material.module';
import { UserInfoComponent } from './protectedPages/user-information/user-info/user-info.component';
import { ProcessDetailsComponent } from './protectedPages/user-information/process-details/process-details.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PurchaseOrderComponent } from './protectedPages/user-information/purchase-order/purchase-order.component';
import { SharedModule } from './shared/shared.module';
import { TaxInvoiceComponent } from './protectedPages/user-information/tax-invoice/tax-invoice.component';
import { ProformaInvoiceDialogFormComponent } from './protectedPages/user-information/process-details/proforma-invoice-dialog-form/proforma-invoice-dialog-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReportsComponent } from './protectedPages/reports/reports.component';
import { AdminComponent } from './protectedPages/admin/admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { CreateUserComponent } from './protectedPages/admin/create-user/create-user.component';
import { ManageUsersComponent } from './protectedPages/admin/manage-users/manage-users.component';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { ManageAdminComponent } from './protectedPages/admin/manage-admin/manage-admin.component';
import { EmailComponent } from './protectedPages/email/email.component'
import { ManageUserDialogComponent } from './protectedPages/admin/manage-user-dialog/manage-user-dialog.component';
import { LovsComponent } from './protectedPages/admin/lovs/lovs.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './services/format-datepicker.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    DashboardComponent,
    SideNavComponent,
    UserInformationComponent,
    UserInfoComponent,
    ProcessDetailsComponent,
    PurchaseOrderComponent,
    TaxInvoiceComponent,
    ProformaInvoiceDialogFormComponent,
    ResetPasswordComponent,
    ReportsComponent,
    AdminComponent,
    HeaderComponent,
    CreateUserComponent,
    ManageUsersComponent,
    GenerateOtpComponent,
    ManageAdminComponent,
    EmailComponent,
    ManageUserDialogComponent,
    LovsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    SharedModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatInputModule
    
  ],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ProformaInvoiceDialogFormComponent, ManageUserDialogComponent]
})
export class AppModule { }

