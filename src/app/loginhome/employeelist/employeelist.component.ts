import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SalaryslipComponent } from "../salaryslip/salaryslip.component";
import { RegisterEmployee } from "../../models/registeremployee";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { ViewService } from "../../view.service";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
import { Station } from "../../models/station";
import { ApiInput } from "../../models/apiinput";
import * as r from "rxjs";
@Component({
  selector: "app-employeelist",
  templateUrl: "./employeelist.component.html",
  styleUrls: ["./employeelist.component.css"]
})
export class EmployeelistComponent implements OnInit, OnDestroy {
  employees: RegisterEmployee[] = [];
  stations: Station[];
  apiInput: ApiInput;
  selectedStation: string = "";
  userType: string = "";
  usrToken: string = "";
  emCode: string = "";
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  stationCode: string = "";
  apiResult: APIResult;
  isHide = true;
  isHE: Boolean = false;
  empId: number = 0;
  e: Employee;
  //t
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
    this.subsc2 = this.vServ.utoken.subscribe((val: string) => {
      this.usrToken = val;
    });
    if (this.userType == "" || this.userType == undefined) {
      this.userType = this.vServ.getValue("storedProp");
    }
    if (this.userType == "hrhe") {
      this.isHE = true;
    }
    this.api.getConstants().subscribe(
      (data: APIResult) => {
        //console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
          this.stations = data.stations;
        } else {
          this.swServ.showErrorMessage("Error!!", m);
        }
      },
      err => {
        //console.log(err.message);
        this.swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );

    // let em: Employee;
    // em = this.getstaticEmployees();
    // this.e = em;
    //   console.log(em);
    // this.employees.push(this.e);
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
    this.subsc2.unsubscribe();
  }
  getemployeesbyStation(event) {
    //console.log(this.selectedStation);
    if (this.usrToken == "") {
      this.usrToken = this.vServ.getToken();
    }
    if (this.selectedStation == "") {
      this.swServ.showErrorMessage("Invalid Input!!!", "Please Select Station");
    } else if (this.usrToken == "" || this.usrToken == undefined) {
      this.handleUnauthorizedrequest();
    } else {
      this.apiInput = new ApiInput();
      this.apiInput.stationId = Number(this.selectedStation);
      this.registeredUsers(this.apiInput);
    }
  }
  registeredUsers(input: ApiInput) {
    this.api
      .getRegisteredEmployees(input, this.usrToken)
      .subscribe((data: APIResult) => {
        //
        // console.log(data);
        let status = data.status;
        let message = data.message;
        if (status) {
          this.employees = data.registerEmployees;
        } else {
          this.swServ.showErrorMessage("Failure!!!", message);
        }
      });
  }
  handleUnauthorizedrequest() {
    this.swServ.showErrorMessage(
      "Invalid Request!!!",
      "Unable to process request, Please login again!!!"
    );
  }
  approveUser(emp: Employee) {
    var id = emp.EmployeeId;
    let e: Employee = new Employee();
    e.EmpCode = this.emCode;
    e.EmployeeId = Number(id);
    if (this.usrToken == "") {
      this.usrToken = this.vServ.getToken();
    }
    if (
      this.emCode == "" ||
      this.emCode == undefined ||
      emp.EmployeeId == 0 ||
      emp.EmployeeId == undefined
    ) {
      this.swServ.showErrorMessage("Invalid Input!!!", "Please try again!!!");
    } else if (this.usrToken == "" || this.usrToken == undefined) {
      this.handleUnauthorizedrequest();
    } else {
      var res = this.swServ.showWarning("Do you want to approve this user?");
      console.log(res);
    }
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
    emp.Address2 = "pragathi nagar";
    emp.Place = "atp";
    emp.State = "AP";
    // emp.PostalCode = ;
    emp.AAdharNumber = "236264657";
    emp.PANNumber = "Aj24u23985";
    emp.Guard_FullName = "Ramdas";

    emp.Gaurd_PhoneNumber = "5353463473";
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
