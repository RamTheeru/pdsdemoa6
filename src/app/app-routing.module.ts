import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NopageComponent } from "./nopage/nopage.component";
import { PdsMainComponent } from "./pds-main/pds-main.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { AbtusComponent } from "./abtus/abtus.component";
import { RegisterComponent } from "./register/register.component";
import { LoginhomeComponent } from "./loginhome/loginhome.component";
import { UserreadingsComponent } from "./loginhome/userreadings/userreadings.component";
import { CreateEmployeeComponent } from "./loginhome/create-employee/create-employee.component";
import { IndividualviewComponent } from "./loginhome/individualview/individualview.component";
import { EmployeelistComponent } from "./loginhome/employeelist/employeelist.component";
import { LogindefaulthomeComponent } from "./loginhome/logindefaulthome/logindefaulthome.component";
import { EntercreditdetailsComponent } from "./loginhome/entercreditdetails/entercreditdetails.component";
import { EmployeesComponent } from "./loginhome/employees/employees.component";
import { DeliveryDetailsComponent } from "./loginhome/delivery-details/delivery-details.component";
import { VoucherComponent } from "./loginhome/voucher/voucher.component";
import { SubmitattendanceComponent } from "./loginhome/submitattendance/submitattendance.component";
import { SalaryslipComponent } from "./loginhome/salaryslip/salaryslip.component";
import { ViewledgerComponent } from "./loginhome/viewledger/viewledger.component";
const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: PdsMainComponent },
  { path: "vision", component: AboutusComponent },
  { path: "aboutus", component: AbtusComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "loginhome",
    component: LoginhomeComponent,
    children: [
      { path: "", component: LogindefaulthomeComponent },
      { path: "userreadings", component: UserreadingsComponent },
      { path: "createemployee", component: CreateEmployeeComponent },
      { path: "createdeliveryassociate", component: CreateEmployeeComponent },
      { path: "updatedeliverydetails", component: DeliveryDetailsComponent },
      { path: "employeeedit/:id", component: CreateEmployeeComponent },
      { path: "individualview/:id", component: IndividualviewComponent },
      { path: "employeelist", component: EmployeelistComponent },
      { path: "entercreditdetails", component: EntercreditdetailsComponent },
      { path: "entervoucher", component: VoucherComponent },
      { path: "editvoucher/:id", component: VoucherComponent },
      { path: "viewledger", component: ViewledgerComponent },
      { path: "verifyvouchers", component: ViewledgerComponent },
      { path: "employees", component: EmployeesComponent },
      { path: "viewdas", component: EmployeesComponent },
      { path: "submitattendance", component: SubmitattendanceComponent },
      { path: "salaryslips", component: SalaryslipComponent },
      { path: "employeesinsufficientdata", component: EmployeesComponent }
      //  {path : 'new',component: RecipeEditComponent ,canActivate:[AuthGuard]},
      //  {path : ':id',component: RecipeDetailComponent },

      //    {path : ':id/edit',component: RecipeEditComponent,canActivate:[AuthGuard],canDeactivate:[CanDeactivateGuard] }
    ]
  },
  { path: "404", component: NopageComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class appRoutingModule {}
