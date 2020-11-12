import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SalaryslipComponent } from "../salaryslip/salaryslip.component";
import { RegisterEmployee } from "../../models/registeremployee";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { ViewService } from "../../view.service";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
import * as r from "rxjs";
@Component({
  selector: "app-employeelist",
  templateUrl: "./employeelist.component.html",
  styleUrls: ["./employeelist.component.css"]
})
export class EmployeelistComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  userType: string = "";
  private subsc: r.Subscription;
  stationCode: string = "";
  apiResult: APIResult;
  isHide = true;
  isHE: Boolean = false;
  empId: number = 0;
  e: Employee;
  constructor(
    private dialog: MatDialog,
    private api: PdsApiService,
    private swServ: SweetService,
    private vServ: ViewService
  ) {}

  ngOnInit() {
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.userType = val;
    });
    if (this.userType == "hrhe") {
      this.isHE = true;
    }
    let em: Employee;
    em = this.getstaticEmployees();
    this.e = em;
    //   console.log(em);
    this.employees.push(this.e);
    // this.api.getEmployees().subscribe(data => {
    //   console.log(data);
    //   this.apiResult = data;
    //   console.log("" + this.apiResult.Status);
    //   this.apiResult.Status = data.status;
    //   this.apiResult.Message = data.message;

    //   if (this.apiResult.Status) {
    //     this.employees = this.apiResult.employees;
    //     console.log(this.employees);
    //   } else {
    //     this.swServ.showErrorMessage("Failure", this.apiResult.Message);
    //   }
    // });
    //this.swServ.showSuccessMessage('Sucess!!','we didit');

    //this.swServ.showWarning('Delete it')
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  getemployeesbyStation(event) {
    this.api.getEmployees(this.stationCode).subscribe(data => {
      console.log(data);
      let status = data.Status;
      let message = data.Message;
      if (status) {
        this.employees = data.employees;
      } else {
        this.swServ.showErrorMessage("Failure", message);
      }
    });
  }
  approveUser(emp: Employee) {
    var id = emp.EmployeeId;
    var res = this.swServ.showWarning("Do you want to approve this user?");
    console.log(res);
  }
  onSalCreate(val: any) {
    //console.log(val);
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "60%";
    config.closeOnNavigation = true;
    config.data = {
      empId: val.target.id
    };
    this.dialog.open(SalaryslipComponent, config);
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  getstaticEmployees() {
    const emp: Employee = new Employee();
    const errorTitle: string = "INVALID INPUT!!!";
    emp.EmployeeId = 10001;
    emp.FirstName = "Ram";
    emp.LastName = "k";
    emp.MiddleName = "";
    emp.Phone = "62463732424";

    emp.Age = 29;

    emp.BloodGroup = "O+";
    emp.Gender = "m";
    emp.Marital = "married";

    emp.Address1 = "D.NO2-65";
    emp.Adress2 = "pragathi nagar";
    emp.Place = "atp";
    emp.State = "AP";
    // emp.PostalCode = ;
    emp.AAdharNumber = "236264657";
    emp.PAN = "Aj24u23985";
    emp.Guard_FullName = "Ramdas";

    emp.Guard_Phone = "5353463473";
    emp.DOB = "09-09-1990";
    emp.DOJ = "09-09-2020";
    emp.Designation = "Office Assisstnat";
    emp.StationCode = "gtkl";
    emp.LocationName = "Guntakal";
    emp.DLLRStatus = "NO";
    emp.VehicleNumber = "";
    emp.DLLRNumber = "";
    emp.BankAccountNumber = "35643637537";
    emp.BankName = "Kotak";
    emp.IFSCCode = "KTKB43523";
    emp.BranchName = "Madhapur";

    return emp;
  }
}
