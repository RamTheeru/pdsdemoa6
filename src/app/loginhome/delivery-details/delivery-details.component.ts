import { Component, OnInit } from "@angular/core";
import { DeliveryDetails } from "../../models/deliverydetails";
@Component({
  selector: "app-delivery-details",
  templateUrl: "./delivery-details.component.html",
  styleUrls: ["./delivery-details.component.css"]
})
export class DeliveryDetailsComponent implements OnInit {
  deliverylist: DeliveryDetails[];
  petrolallowance: number = 0;
  standardRate: number = 0;
  inputs: string[] = [];
  list: DeliveryDetails[] = [];
  // list: DeliveryDetails[] = [
  //   {
  //     Id: 101,
  //     EmployeeCode: "180101",
  //     EmployeeName: "Ram",
  //     DeliveryCount: 5,
  //     StandardRate: "Fixed By Admin",
  //     Incentive: 2330,
  //     TotalAmount: 10000
  //   },
  //   {
  //     Id: 102,
  //     EmployeeCode: "180102",
  //     EmployeeName: "Ravi",
  //     DeliveryCount: 7,
  //     StandardRate: "Fixed By Admin",
  //     Incentive: 2230,
  //     TotalAmount: 9000
  //   },
  //   {
  //     Id: 103,
  //     EmployeeCode: "180103",
  //     EmployeeName: "Raju",
  //     DeliveryCount: 9,
  //     StandardRate: "Fixed By Admin",
  //     Incentive: 3230,
  //     TotalAmount: 12000
  //   }
  // ];
  constructor() {}

  ngOnInit() {}
  focusOutFunction(val, event) {
    console.log(event);
    if (val == "dvc") {
      var id = event.target.id;
      var val = event.target.value;
      this.inputs.push(id + "-delcount-" + val);
    } else if (val == "inc") {
      var id = event.target.id;
      var val = event.target.value;
      this.inputs.push(id + "-incent-" + val);
    }
  }
  Onsub() {
    console.log(this.inputs);
  }
}
