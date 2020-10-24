import { Component, OnInit } from "@angular/core";
import { Employee } from "../../models/employee";
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor() {}

  ngOnInit() {}
}
