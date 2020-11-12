import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Employee } from "../../models/employee";
@Component({
  selector: "app-salaryslip",
  templateUrl: "./salaryslip.component.html",
  styleUrls: ["./salaryslip.component.css"]
})
export class SalaryslipComponent implements OnInit {
  month: number;
  empId: number = 0;
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
  //sending data
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.empId = data.empId;
    //console.log(this.empId);
  }

  ngOnInit() {}

  focusOutFunction(val,event) {}
}
