import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClerkComponent } from './Components/add-clerk/add-clerk.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddClerkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
   
    HttpClientModule,
    
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
