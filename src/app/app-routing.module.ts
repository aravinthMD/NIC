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
