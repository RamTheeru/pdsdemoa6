import { Component, OnInit } from "@angular/core";
import { Employee } from "../../models/employee";
@Component({
  selector: "app-salaryslip",
  templateUrl: "./salaryslip.component.html",
  styleUrls: ["./salaryslip.component.css"]
})
export class SalaryslipComponent implements OnInit {
  month: number;
  emp: Employee;
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  constructor() {}

  ngOnInit() {}
}
