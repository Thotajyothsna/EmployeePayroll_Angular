import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegistrationComponent } from './Components/registration/registration.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'register',component:RegistrationComponent},
  {path:'**',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
