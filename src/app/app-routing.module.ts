import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { registrationcompoment } from './Components/registration/registration.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'register',component:registrationcompoment},
  {path:'register/:id',component:registrationcompoment},
  {path:'**',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
