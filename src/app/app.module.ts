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
import {MatDatepickerModule,MatCardModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './services/format-datepicker.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@services/auth.interceptor.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TechnicalAdminDetailsComponent } from './protectedPages/user-information/user-info/technical-admin-details/technical-admin-details.component';
import { BillingOwnerDetailsComponent } from './protectedPages/user-information/user-info/billing-owner-details/billing-owner-details.component';
import { SmsCreditAllocationComponent } from './protectedPages/user-information/user-info/sms-credit-allocation/sms-credit-allocation.component';
import { AccountManageComponent } from './protectedPages/admin/account-manage/account-manage.component';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { PurchaseEntryComponent } from './protectedPages/user-information/purchase-entry/purchase-entry.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: 'red',
  // fgsColor: '#fa6745',
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 100,
  // bgsType: SPINNER.cubeGrid, // background spinner type
  // fgsType: SPINNER.cubeGrid, // foreground spinner type
  // pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  // pbThickness: 5, // progress bar thickness

  "bgsColor": "#0e4d92",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#0e4d92",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#0e4d92",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};



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
    PurchaseEntryComponent,
    TechnicalAdminDetailsComponent,
    BillingOwnerDetailsComponent,
    SmsCreditAllocationComponent,
    AccountManageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ProformaInvoiceDialogFormComponent, ManageUserDialogComponent]
})
export class AppModule { }

