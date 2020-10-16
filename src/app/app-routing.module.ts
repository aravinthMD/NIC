import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './protectedPages/dashboard/dashboard.component';
import { ProtectedComponent } from './protectedPages/protected/protected.component';
import { UserInformationComponent } from './protectedPages/user-information/user-information.component';


const routes: Routes = [
  {path:"",component :LoginComponent},
  {path : "users",component : ProtectedComponent,
  children : [
    { path : "Dashboard" , component : DashboardComponent },
    { path : "userInfo" , component : UserInformationComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
