import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClerkComponent } from './Components/add-clerk/add-clerk.component';
import { LoginComponent } from './Components/login/login.component';
import { AddShelterComponent } from './Components/add-shelter/add-shelter.component';
import { HomeComponent } from './Components/home/home.component';
import { ShowShelterComponent } from './Components/show-shelter/show-shelter.component';
import { UpdateShelterComponent } from './Components/update-shelter/update-shelter.component';
import { UpdateClerkComponent } from './Components/update-clerk/update-clerk.component';
// import { ViewShelterComponent } from './Components/view-shelter/view-shelter.component';


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
  // {
  //    path:"viewSelter",
  //    component:ViewShelterComponent
  // },
  {
    path:"showShelter",
    component:ShowShelterComponent
  },
  {
    path:"shelters/updateShelter",
    component:UpdateShelterComponent
  },
  {
    path:"shelters/updateSelectedShelter",
    component:AddShelterComponent
  },
  {
    path:"clerks/updateSelectedClerks",
    component:AddClerkComponent
  },
  {
    path:"clerks/updateClerks",
    component:UpdateClerkComponent
  },
  {
    path:"**",
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

