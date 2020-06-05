import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClerkComponent } from './Components/add-clerk/add-clerk.component';
import { LoginComponent } from './Components/login/login.component';


const routes: Routes = [
  {
    path:"register",
    component:AddClerkComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"**",
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
