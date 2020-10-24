import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
import { ViewService } from "../../view.service";
import * as r from "rxjs";
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit, OnDestroy {
  @Input("") userType: string;
  employees: Employee[] = [];
  e: Employee;
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  edleVerify: string = "";
  isEdle: Boolean = false;
  isLe: Boolean = false;
  isHe: Boolean = false;
  apiResult: APIResult;
  constructor(
    private api: PdsApiService,
    private swServ: SweetService,
    private vServ: ViewService
  ) {}
  getstaticEmployees() {
    const emp: Employee = new Employee();
    const errorTitle: string = "INVALID INPUT!!!";

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
  ngOnInit() {
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.userType = val;
    });

    this.subsc2 = this.vServ.verify.subscribe((val: string) => {
      this.edleVerify = val;
    });
    var index = this.userType.indexOf("le");
    if (index !== -1) {
      this.isLe = true;
      this.isHe = false;
      if (this.edleVerify == "edle") {
        this.isEdle = true;
      } else {
        this.isEdle = false;
      }
    } else {
      this.isHe = true;
    }
    let em: Employee;
    em = this.getstaticEmployees();
    this.e = em;
    console.log(em);
    this.employees.push(this.e);
    em = this.getstaticEmployees();
    this.e = em;
    this.e = this.getstaticEmployees();
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
  }
  
}
