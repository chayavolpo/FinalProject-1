import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClerkComponent } from './Components/add-clerk/add-clerk.component';
import { LoginComponent } from './Components/login/login.component';
import { AddShelterComponent } from './Components/add-shelter/add-shelter.component';
import { ViewShelterComponent } from './Components/view-shelter/view-shelter.component';


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
    path:"shelters/addShelter",
    component:AddShelterComponent
  },
  {
     path:"viewSelter",
     component:ViewShelterComponent
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
