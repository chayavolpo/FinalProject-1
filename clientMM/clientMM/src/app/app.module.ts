import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AddShelterComponent } from './Components/add-shelter/add-shelter.component';
import { AddClerkComponent } from './Components/add-clerk/add-clerk.component';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import {TooltipModule} from 'primeng/tooltip';
import { HomeComponent } from '../app/Components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ShowShelterComponent } from './Components/show-shelter/show-shelter.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {CountryService} from '../app/Services/country.service';
import { UpdateShelterComponent } from './Components/update-shelter/update-shelter.component'
import {OrderListModule} from 'primeng/orderlist';
import { UpdateClerkComponent } from './Components/update-clerk/update-clerk.component';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddShelterComponent,
    AddClerkComponent,
    HomeComponent,
    ShowShelterComponent,
    UpdateShelterComponent,
    UpdateClerkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    TooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdPX8_Gp-cDDJVJGFFi1Y_kUAObIagriQ'
    }),
    AgmDirectionModule,
    OrderListModule,
    DialogModule,
    ButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [CountryService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
