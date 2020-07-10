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
// import { ViewShelterComponent, } from './Components/view-shelter/view-shelter.component';
import {MatDialogModule, MatFormFieldModule,MatInputModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogOverviewExample ,DialogOverviewExampleDialog} from './Components/example/dialog-overview-example';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddClerkComponent,
    AddShelterComponent,
    UpdateShelterComponent,
    // ViewShelterComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExample
   
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule ,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  // entryComponents: [
  //   ViewShelterComponent
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
