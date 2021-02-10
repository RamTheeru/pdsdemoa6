import { Component, OnInit } from "@angular/core";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { ApiInput } from "../../models/apiinput";
import { SweetService } from "../../sweet.service";
import { UserType } from "../../models/usertype";
import { PDFInput } from "../../models/pdfinput";
import { ViewService } from "../../view.service";
import swal from "sweetalert2";
@Component({
  selector: "app-downloadinvoice",
  templateUrl: "./downloadinvoice.component.html",
  styleUrls: ["./downloadinvoice.component.css"]
})
export class DownloadinvoiceComponent implements OnInit {
  showPath: boolean = false;
  usrToken: string = "";
  path: string = "";
  currentmonth:number
  apiInput: ApiInput;
  constructor(
    private swServ: SweetService,
    private api: PdsApiService,
    private vServ: ViewService
  ) {}
  getemployeesbyMonth(event) {
    //console.log(this.selectedStation) ;
    if (this.usrToken == "") {
      this.usrToken = this.vServ.getToken();
    }
    if (this.currentmonth == 0) {
      this.swServ.showErrorMessage("Invalid Input!!!", "Please Select Month");
      this.employees = [];
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
  handleUnauthorizedrequest() {
    this.swServ.showErrorMessage(
      "Invalid Request!!!",
      "Unable to process request with invalid token, Please login again!!!"
    );
  }
  shwPath() {
    swal({
      title: "Are you sure?",
      text: "Do you want to Download Invoice for all CDAs under this station?",
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(willDelete => {
      if (willDelete.value) {
        // console.log(deliverylist);
        // this.updateDeilveryDetails(deliverylist, this.usrToken);
        // this.api.approveUser(e.RegisterId, status);
      } else {
        this.swServ.showErrorMessage("Canelled", "");
      }
    });
    // if (!this.showPath) {
    //   this.showPath = true;
    // }
  }
  getemployees(input: ApiInput) {
    this.load = true;
    this.api
      .getdeliveryassociates(input, this.usrToken)
      .subscribe((data: APIResult) => {
        this.load = false;
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
  ngOnInit() {
    this.subsc = this.vServ.utoken.subscribe((val: string) => {
      this.usrToken = val;
    });
    this.subsc2 = this.vServ.userInfo.subscribe((res: UserType) => {
      this.userInfo = res;
    });
  }
  Onsub() {}
}
