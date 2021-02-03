import { Component, OnInit, OnDestroy } from "@angular/core";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { ApiInput } from "../../models/apiinput";
import { SweetService } from "../../sweet.service";
import { ViewService } from "../../view.service";
import { Employee } from "../../models/employee";
import { UserType } from "../../models/usertype";
import { CommercialConstant } from "../../models/commercialconstant";
import { DeliveryDetails } from "../../models/deliverydetails";
import * as r from "rxjs";
import { forEach } from "@angular/router/src/utils/collection";
const deliverylist: DeliveryDetails[] = [];
const dd = new DeliveryDetails();
@Component({
  selector: "app-delivery-details",
  templateUrl: "./delivery-details.component.html",
  styleUrls: ["./delivery-details.component.css"]
})
export class DeliveryDetailsComponent implements OnInit, OnDestroy {
  petrolallowance: number = 0;
  standardRate: number = 0;
  load: boolean = false;

  cc: CommercialConstant;
  isHide: boolean = true;
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
    if (
      this.stationId == 0 ||
      this.stationId == null ||
      this.stationId == undefined
    ) {
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
      this.api
        .getCDADeliverybyStation(this.stationId, this.usrToken)
        .subscribe((data: APIResult) => {
          let status = data.status;
          let message = data.message;
          if (status) {
            this.cc = data.commercialConstant;
            // console.log(data);
            this.standardRate = this.cc.deliveryRate;
            this.petrolallowance = this.cc.petrolAllowance;
          } else {
            this.swServ.showErrorMessage("Failure!!!", message);
          }
        });
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
    } else if (this.standardRate == 0 || this.petrolallowance == 0) {
      this.swServ.showErrorMessage(
        "Something Went Wrong!!",
        "Unable to get Station Delivery Details, Please try again!!"
      );
    } else {
      this.apiInput = new ApiInput();
      this.apiInput.stationId = Number(this.stationId);
      this.apiInput.currentmonth = this.currentmonth;
      this.getemployees(this.apiInput);
    }
  }
  focusOutFunction(val, event) {
    console.log(this.inputs);
    console.log(event);
    let del = "";
    let v2 = "";
    let id = "0";
    var test = false;
    let title = "Invalid Input!!!";
    let msg = "Please Enter Only Numbers";
    if (val == "dvc") {
      id = event.target.id;
      id = id.toString();
      del = event.target.value;
      del = del.toString();
      if (del == null || del == undefined || del == "") {
        del = "0";
        this.swServ.showMessage(
          "ALert!!!",
          "Values that are not given will be taken as ZERO(default)"
        );
      }
      if (del != null || del != "") {
        test = this.api.ValidateNumbers(del);
        if (!test) {
          this.swServ.showErrorMessage(title, msg);
        } else {
          //  var ind = this.inputs.indexOf(e=>e.startsWith(id+'-delcount'));
          this.inputs = this.inputs.filter(
            e => !e.startsWith(id + "-delcount-")
          );
          this.inputs.push(id + "-delcount-" + del);
        }
      }
    } else if (val == "inc") {
      id = event.target.id;
      id = id.toString();
      v2 = event.target.value;
      v2 = v2.toString();
      if (v2 == null || v2 == undefined || v2 == "") {
        v2 = "0";
        this.swServ.showMessage(
          "ALert!!!",
          "Values that are not given will be taken as ZERO(default)"
        );
      }
      if (v2 != null || v2 != "") {
        test = this.api.ValidateNumbers(v2);
        if (!test) {
          this.swServ.showErrorMessage(title, msg);
        } else {
          this.inputs = this.inputs.filter(e => !e.startsWith(id + "-incent-"));
          this.inputs.push(id + "-incent-" + v2);
        }
      }
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
    this.load = true;
    //let dd: DeliveryDetails = new DeliveryDetails();
    let count = this.inputs.length;
    if (count > 0) {
      this.inputs.forEach(function(val) {
        let ele = val;
        //dd = new DeliveryDetails();
        dd.StationId = this.stationId;
        dd.DeliveryRate = this.standardRate;
        dd.PetrolAllowance = this.petrolallowance;
        dd.CurrentMonth = this.currentmonth;
        if (ele.includes("del")) {
          var splitted = ele.split("-", 3);
          let c = Number(splitted[2]);
          let id = Number(splitted[0]);
          if (c == NaN || c == undefined) {
            c = 0;
          }
          // dd.DeliveryCount = c;
          let found = deliverylist.some(el => el.EmployeeId === id);
          if (found) {
            deliverylist.find(el => el.EmployeeId == id).DeliveryCount = c;
          } else {
            dd.DeliveryCount = c;
            deliverylist.push(dd);
          }
        } else if (ele.includes("inc")) {
          var splitted2 = ele.split("-", 3);
          let c2 = Number(splitted2[2]);
          let id = Number(splitted2[0]);
          if (c2 == NaN || c2 == undefined) {
            c2 = 0;
          }
          let found = deliverylist.some(el => el.EmployeeId === id);
          if (found) {
            deliverylist.find(el => el.EmployeeId == id).Incentive = c2;
          } else {
            dd.DeliveryCount = c2;
            deliverylist.push(dd);
          }
        }
      });
      // forEach(let i of this.inputs)
      // {
      //         let dd = new DeliveryDetails();
      // dd.stationId = this.stationId;
      // dd.DeliveryRate = this.standardRate;
      // dd.PetrolAllowance = this.petrolallowance;
      // }
      this.api
        .updateCDADeliverylist(deliverylist, this.usrToken)
        .subscribe((data: APIResult) => {
          this.load = false;
          let status = data.status;
          let message = data.message;
          if (status) {
            this.swServ.showSuccessMessage("Sucess!!!", message);
            this.ngOnInit();
          } else {
            this.swServ.showErrorMessage("Failure!!!", message);
          }
        });
    } else {
      this.swServ.showErrorMessage(
        "Invalid Input!!!",
        "Please Enter Details for atleast one Employee"
      );
    }
  }
}
