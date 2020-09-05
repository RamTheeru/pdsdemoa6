import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes,RouterModule,PreloadAllModules} from '@angular/router';
import { AppComponent } from './app.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {appRoutingModule} from './app-routing.module';
//import {HttpClientModule} from "@angular/common/http";

import { PdsMainComponent } from './pds-main/pds-main.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LogintabComponent } from './logintab/logintab.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { RegisterComponent } from './register/register.component';
import { AbtusComponent } from './abtus/abtus.component';
import { ViewService } from './view.service';
import { PdsApiService } from './pds-api.service';
//import { SweetService } from './sweet.service';




@NgModule({
  imports:      [ BrowserModule, FormsModule,ReactiveFormsModule,HttpClientModule,appRoutingModule ],
  declarations: [ AppComponent, PdsMainComponent, HomeComponent, LoadingComponent, AboutusComponent, LogintabComponent, ScrollingComponent, RegisterComponent, AbtusComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ViewService, PdsApiService]
})
export class AppModule { }
