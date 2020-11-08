import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { appRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
//import {HttpClientModule} from "@angular/common/http";

import { PdsMainComponent } from "./pds-main/pds-main.component";
import { HomeComponent } from "./home/home.component";
import { LoadingComponent } from "./loading/loading.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { LogintabComponent } from "./logintab/logintab.component";
import { ScrollingComponent } from "./scrolling/scrolling.component";
import { RegisterComponent } from "./register/register.component";
import { AbtusComponent } from "./abtus/abtus.component";
import { NopageComponent } from "./nopage/nopage.component";
import { LoginhomeComponent } from "./loginhome/loginhome.component";
import { UserreadingsComponent } from "./loginhome/userreadings/userreadings.component";
import { CreateEmployeeComponent } from "./loginhome/create-employee/create-employee.component";
import { IndividualviewComponent } from "./loginhome/individualview/individualview.component";
import { EmployeelistComponent } from "./loginhome/employeelist/employeelist.component";
import { EmployeesComponent } from "./loginhome/employees/employees.component";
import { DeliveryDetailsComponent } from "./loginhome/delivery-details/delivery-details.component";
import { LogindefaulthomeComponent } from "./loginhome/logindefaulthome/logindefaulthome.component";
import { EntercreditdetailsComponent } from "./loginhome/entercreditdetails/entercreditdetails.component";
import { VoucherComponent } from "./loginhome/voucher/voucher.component";
import { ViewledgerComponent } from "./loginhome/viewledger/viewledger.component";
import { SubmitattendanceComponent } from "./loginhome/submitattendance/submitattendance.component";
import { ViewService } from "./view.service";
import { PdsApiService } from "./pds-api.service";
import { SweetService } from "./sweet.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    PdsMainComponent,
    HomeComponent,
    LoadingComponent,
    AboutusComponent,
    LogintabComponent,
    ScrollingComponent,
    RegisterComponent,
    AbtusComponent,
    LoginhomeComponent,
    UserreadingsComponent,
    CreateEmployeeComponent,
    IndividualviewComponent,
    EmployeelistComponent,
    EmployeesComponent,
    LogindefaulthomeComponent,
    EntercreditdetailsComponent,
    VoucherComponent,
    ViewledgerComponent,
    DeliveryDetailsComponent,
    SubmitattendanceComponent,
    NopageComponent
  ],
  bootstrap: [AppComponent],
  providers: [ViewService, PdsApiService, SweetService]
})
export class AppModule {}
