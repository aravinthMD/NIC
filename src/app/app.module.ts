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
import {MatDatepickerModule,MatCardModule, MatSortModule, MatToolbarModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './services/format-datepicker.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@services/auth.interceptor.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TechnicalAdminDetailsComponent } from './protectedPages/user-information/user-info/technical-admin-details/technical-admin-details.component';
import { BillingOwnerDetailsComponent } from './protectedPages/user-information/user-info/billing-owner-details/billing-owner-details.component';
import { SmsCreditAllocationComponent } from './protectedPages/user-information/user-info/sms-credit-allocation/sms-credit-allocation.component';
import { AccountManageComponent } from './protectedPages/admin/account-manage/account-manage.component';
import {MatChipsModule} from '@angular/material/chips';
import {TaxInvoiceDialogComponent} from './protectedPages/user-information/tax-invoice/tax-invoice-dialog/tax-invoice-dialog.component'
import {MatIconModule} from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CsvUploadModalComponent } from './protectedPages/csv-upload-modal/csv-upload-modal.component';



import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderService
} from 'ngx-ui-loader';
import { ProjectExecutionComponent } from './protectedPages/user-information/project-execution/project-execution.component';
import { ManageGroupComponent } from './protectedPages/email/manage-group/manage-group.component';
import { ProjectExcecutionDialogComponent } from './protectedPages/user-information/project-execution/project-excecution-dialog/project-excecution-dialog.component';
import { PurchaseOrderDialogComponent } from './protectedPages/user-information/purchase-order/purchase-order-dialog/purchase-order-dialog.component';
import { ReportsTableComponent } from './protectedPages/reports/reports-table/reports-table.component';
import { SmsCreditDialogComponent } from './protectedPages/user-information/user-info/sms-credit-allocation/sms-credit-dialog/sms-credit-dialog.component';
import { ViewTechnicalAdminComponent } from './protectedPages/user-information/user-info/technical-admin-details/view-technical-admin/view-technical-admin.component';
import { DefineRolesComponent } from './protectedPages/admin/define-roles/define-roles.component';
import { AdminRolesMappingDialogComponent } from './protectedPages/admin/define-roles/admin-roles-mapping-dialog/admin-roles-mapping-dialog.component';
import { ManageEmailComponent } from './protectedPages/admin/manage-email/manage-email.component';
import { AuthguardService } from '@services/authguard.service';
import { ScheduleEmailDialogComponent } from './protectedPages/email/schedule-email-dialog/schedule-email-dialog.component';
import { BulkUploadComponent } from './protectedPages/bulk-upload/bulk-upload.component';
import { MainpageComponent } from './protectedPages/mainpage/mainpage.component';

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
    DashboardComponent,  
    ProformaInvoiceDialogFormComponent,
    ResetPasswordComponent,
    ReportsComponent,
    AdminComponent,
    // HeaderComponent,
    CreateUserComponent,
    ManageUsersComponent,
    GenerateOtpComponent,
    ManageAdminComponent,
    EmailComponent,
    ManageUserDialogComponent,
    LovsComponent,  
    AccountManageComponent,
    ManageGroupComponent,
    ProjectExcecutionDialogComponent,
    PurchaseOrderDialogComponent,
    TaxInvoiceDialogComponent,
    ReportsTableComponent,
    SmsCreditDialogComponent,
    ViewTechnicalAdminComponent,
    DefineRolesComponent,
    AdminRolesMappingDialogComponent,
    ManageEmailComponent,
    ScheduleEmailDialogComponent,
    // CsvUploadModalComponent,
    BulkUploadComponent,
    MainpageComponent
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
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass:'toast-top-center'
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgMultiSelectDropDownModule.forRoot()
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
      useClass: AuthInterceptorService,
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    NgxUiLoaderService,
    AuthguardService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    ProformaInvoiceDialogFormComponent,
    ManageUserDialogComponent,
    ProjectExcecutionDialogComponent,
    TaxInvoiceDialogComponent,
    PurchaseOrderDialogComponent,
    SmsCreditDialogComponent,
    AdminRolesMappingDialogComponent,
    ScheduleEmailDialogComponent,
    // CsvUploadModalComponent
  ]
})
export class AppModule { }

