import { Component, OnInit } from "@angular/core";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  apiResult: APIResult;
  constructor(private api: PdsApiService, private swServ: SweetService) {}

  ngOnInit() {
    this.api.getEmployees().subscribe(data => {
      console.log(data);
      this.apiResult = data;
      console.log("" + this.apiResult.Status);
      this.apiResult.Status = data.status;
      this.apiResult.Message = data.message;

      if (this.apiResult.Status) {
        this.employees = this.apiResult.employees;
        console.log(this.employees);
      } else {
        this.swServ.showErrorMessage("Failure", this.apiResult.Message);
      }
    });
  }
}
