import { Component, OnInit, OnDestroy } from "@angular/core";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { ApiInput } from "../../models/apiinput";
import { SweetService } from "../../sweet.service";
import { ViewService } from "../../view.service";
import { Employee } from "../../models/employee";
import { UserType } from "../../models/usertype";
import { DeliveryDetails } from "../../models/deliverydetails";
import * as r from "rxjs";
@Component({
  selector: "app-delivery-details",
  templateUrl: "./delivery-details.component.html",
  styleUrls: ["./delivery-details.component.css"]
})
export class DeliveryDetailsComponent implements OnInit, OnDestroy {
  deliverylist: DeliveryDetails[];
  petrolallowance: number = 0;
  standardRate: number = 0;
  currentmonth: number = 0;
  apiInput: ApiInput;
  inputs: string[] = [];
  stationId: number = 0;
  usrToken: string = "";
  employees: Employee[] = [];
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  userInfo: UserType;
  pageCount: number = 1;
  pages = [];
  totalCount: number = 0;
  list: DeliveryDetails[] = [];
  months = [
    { id: 1, name: "January" },
    { id: 2, name: "Febrauary" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" }
  ];
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
  constructor(
    private api: PdsApiService,
    private swServ: SweetService,
    private vServ: ViewService
  ) {}
  handleUnauthorizedrequest() {
    this.swServ.showErrorMessage(
      "Invalid Request!!!",
      "Unable to process request with invalid token, Please login again!!!"
    );
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
  }
  ngOnInit() {
    this.subsc = this.vServ.utoken.subscribe((val: string) => {
      this.usrToken = val;
    });
    if (
      this.usrToken == "" ||
      this.usrToken == undefined ||
      this.usrToken == null
    ) {
      this.usrToken = this.vServ.getToken();
    }
    this.subsc2 = this.vServ.userInfo.subscribe((res: UserType) => {
      this.userInfo = res;
    });
    if (this.userInfo == null || this.userInfo == undefined) {
      var u = this.vServ.getValue("userProp");
      this.userInfo = JSON.parse(u);
    }
    this.stationId = this.userInfo.stationId;
    if (this.stationId == 0) {
      this.swServ.showErrorMessage(
        "Something Went Wrong!!",
        "Unable to get Station, Please try again!!"
      );
    } else if (
      this.usrToken == "" ||
      this.usrToken == undefined ||
      this.usrToken == null
    ) {
      this.handleUnauthorizedrequest();
    } else {
      // this.apiInput = new ApiInput();
      // this.apiInput.stationId = Number(this.stationId);
      // this.getemployees(this.apiInput);
    }
  }
  getemployeesbyMonth(event) {
    //console.log(this.selectedStation) ;
    if (this.usrToken == "") {
      this.usrToken = this.vServ.getToken();
    }
    if (this.currentmonth == 0) {
      this.swServ.showErrorMessage("Invalid Input!!!", "Please Select Month");
    } else if (
      this.usrToken == "" ||
      this.usrToken == undefined ||
      this.usrToken == null
    ) {
      this.handleUnauthorizedrequest();
    } else {
      this.apiInput = new ApiInput();
      this.apiInput.stationId = Number(this.stationId);
      this.apiInput.currentmonth = this.currentmonth;
      this.getemployees(this.apiInput);
    }
  }
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
  getemployees(input: ApiInput) {
    this.api
      .getCDADeliverylist(input, this.usrToken)
      .subscribe((data: APIResult) => {
        let status = data.status;
        let message = data.message;
        if (status) {
          this.employees = data.employees;
          this.pageCount = data.queryPages;
          this.totalCount = data.queryTotalCount;
          this.pages = this.api.transform(this.pageCount);
          console.log(data);
        } else {
          this.swServ.showErrorMessage("Failure!!!", message);
        }
      });
  }
  Onsub() {
    console.log(this.inputs);
  }
}
