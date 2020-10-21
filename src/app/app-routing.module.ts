import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './protectedPages/dashboard/dashboard.component';
import { ProtectedComponent } from './protectedPages/protected/protected.component';
import { ReportsComponent } from './protectedPages/reports/reports.component';
import { UserInformationComponent } from './protectedPages/user-information/user-information.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';


const routes: Routes = [
  {path:"",component :LoginComponent},
  {path:"resetpassword",component : ResetPasswordComponent},
  {path : "users",component : ProtectedComponent,
  children : [
    { path : "Dashboard" , component : DashboardComponent },
    { path : "userInfo" , component : UserInformationComponent },
    { path : "reports" , component : ReportsComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
