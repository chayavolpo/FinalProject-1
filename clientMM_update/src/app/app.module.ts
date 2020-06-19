import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClerkComponent } from './Components/add-clerk/add-clerk.component';
import { AddShelterComponent } from './Components/add-shelter/add-shelter.component';
import { UpdateShelterComponent } from './Components/update-shelter/update-shelter.component';
import { ViewShelterComponent } from './Components/view-shelter/view-shelter.component';
import {MatDialogModule, MatFormFieldModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddClerkComponent,
    AddShelterComponent,
    UpdateShelterComponent,
    ViewShelterComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
   MatDialogModule,
    HttpClientModule,
    
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
