import {
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
  ViewChildren,
  OnDestroy
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { ApiInput } from "../../models/apiinput";
import { SweetService } from "../../sweet.service";
import { UserType } from "../../models/usertype";
import { PDFInput } from "../../models/pdfinput";
import { ViewService } from "../../view.service";
import * as r from "rxjs";
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input("") userType: string;
  @ViewChildren("tablist") tablist;
  isHide: boolean = true;
  usrToken: string = "";
  userInfo: UserType;
  currentmonth: number = 0;
  pageCount: number = 1;
  pages = [];
  selectedEmps = [];
  stationId: number = 0;
  totalCount: number = 0;
  ledgerIds = [];
  employees: Employee[] = [];
  e: Employee;
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  private subsc3: r.Subscription;
  private subsc4: r.Subscription;
  private subsc5: r.Subscription;
  private subsc6: r.Subscription;
  @Input("") edleVerify: string = "";
  @Input("") evheVerify: string = "";
  isEdle: Boolean = false;
  isEvhe: Boolean = false;
  isLe: Boolean = false;
  isHe: Boolean = false;
  apiResult: APIResult;
  ishrvhe: Boolean = false;
  selectedStation: string = "";
  apiInput: ApiInput;
  @Input("") hrvheVerify: string = "";
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
  constructor(
    private route: ActivatedRoute,
    private api: PdsApiService,
    private swServ: SweetService,
    private vServ: ViewService
  ) {
    // override the        route reuse strategy
    // this.router.routeReuseStrategy.shouldReuseRoute =    function() {
    //   return false;
    //
    // };

    route.paramMap.subscribe(val => {
      // this.ngOnInit();
      // put the code  When you want to router navigate on the same page and want to call ngOnInit()
    });
  }
  getemployeesbyStation(event) {
    //console.log(this.selectedStation) ;
    if (this.usrToken == "") {
      this.usrToken = this.vServ.getToken();
    }
    if (this.selectedStation == "") {
      this.swServ.showErrorMessage("Invalid Input!!!", "Please Select Station");
    } else if (
      this.usrToken == "" ||
      this.usrToken == undefined ||
      this.usrToken == null
    ) {
      this.handleUnauthorizedrequest();
    } else {
      this.apiInput = new ApiInput();
      this.apiInput.stationId = Number(this.selectedStation);
      //this.getemployees(this.apiInput);
    }
  }
  handleUnauthorizedrequest() {
    this.swServ.showErrorMessage(
      "Invalid Request!!!",
      "Unable to process request with invalid token, Please login again!!!"
    );
  }
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
  getemployees(input: ApiInput) {
    this.api
      .getdeliveryassociates(input, this.usrToken)
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
  getdata(val: number) {
    console.log(val);
    this.apiInput = new ApiInput();
    this.apiInput.page = val;
    this.apiInput.stationId = Number(this.selectedStation);
    if (this.isLe == true && this.isEdle === false) {
      this.apiInput.stationId = this.stationId;
    }

    this.getemployees(this.apiInput);
  }
  // getstaticEmployees() {
  //   const emp: Employee = new Employee();
  //   const errorTitle: string = "INVALID INPUT!!!";
  //   emp.EmployeeId = 1;
  //   emp.FirstName = "Ram";
  //   emp.LastName = "k";
  //   emp.MiddleName = "";
  //   emp.Phone = "62463732424";

  //   emp.Age = 29;

  //   emp.BloodGroup = "O+";
  //   emp.Gender = "m";
  //   emp.Marital = "married";

  //   emp.Address1 = "D.NO2-65";
  //   emp.Address2 = "pragathi nagar";
  //   emp.Place = "atp";
  //   emp.State = "AP";
  //   // emp.PostalCode = ;
  //   emp.AAdharNumber = "236264657";
  //   emp.PANNumber = "Aj24u23985";
  //   emp.Guard_FullName = "Ramdas";

  //   emp.Gaurd_PhoneNumber = "5353463473";
  //   emp.DOB = "09-09-1990";
  //   emp.DOJ = "09-09-2020";
  //   emp.Designation = "Office Assisstnat";
  //   emp.StationCode = "gtkl";
  //   emp.LocationName = "Guntakal";
  //   emp.DLLRStatus = "NO";
  //   emp.VehicleNumber = "";
  //   emp.DLLRNumber = "";
  //   emp.BankAccountNumber = "35643637537";
  //   emp.BankName = "Kotak";
  //   emp.IFSCCode = "KTKB43523";
  //   emp.BranchName = "Madhapur";

  //   return emp;
  // }
  ngAfterViewInit() {
    //this.ngOnInit();
  }
  ngOnChanges() {
    console.log("page reloading");
    //this.ngOnInit();
    //sfsagdsh
  }
  ngOnInit() {
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.userType = val;
    });

    this.subsc2 = this.vServ.verify.subscribe((val: string) => {
      this.edleVerify = val;
    });
    this.subsc3 = this.vServ.verify2.subscribe((val: string) => {
      this.evheVerify = val;
    });
    this.subsc4 = this.vServ.verify3.subscribe((val: string) => {
      this.hrvheVerify = val;
    });
    this.subsc5 = this.vServ.utoken.subscribe((val: string) => {
      this.usrToken = val;
    });
    this.subsc6 = this.vServ.userInfo.subscribe((res: UserType) => {
      this.userInfo = res;
    });
    if (this.userInfo == null || this.userInfo == undefined) {
      var u = this.vServ.getValue("userProp");
      this.userInfo = JSON.parse(u);
    }
    if (
      this.usrToken == "" ||
      this.usrToken == undefined ||
      this.usrToken == null
    ) {
      this.usrToken = this.vServ.getToken();
    }
    //console.log(this.userInfo);
    this.stationId = this.userInfo.stationId;
    var index = this.userType.indexOf("le");
    if (index !== -1) {
      this.ishrvhe = false;
      this.isLe = true;
      this.isHe = false;
      this.isEvhe = false;
      if (this.edleVerify == "edle") {
        this.isEdle = true;
      } else {
        this.isEdle = false;
      }
    } else {
      this.isHe = true;
      this.isLe = false;
      this.isEdle = false;
      // console.log("verify hrvhe :" + this.hrvheVerify);
      if (this.hrvheVerify == "hrvhe") {
        this.ishrvhe = true;

        this.isEvhe = false;
      } else {
        this.ishrvhe = false;
        //this.evheVerify = this.vServ.getValue("evheVerify");
        //   console.log("verify ehe :" + this.evheVerify);
        if (this.evheVerify == "evhe") {
          this.isEvhe = true;
        } else {
          this.isEvhe = false;
        }
      }
    }
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
    } else if (this.isLe == true && this.isEdle === false) {
      this.apiInput = new ApiInput();
      this.apiInput.stationId = Number(this.stationId);
      this.getemployees(this.apiInput);
    }
    // let em: Employee;
    // em = this.getstaticEmployees();
    // this.e = em;
    // //  console.log(em);
    // //   this.employees.push(this.e);
    // em = this.getstaticEmployees();
    // this.e = em;
    // this.e = this.getstaticEmployees();
    //this.employees.push(this.e);
    // this.api.getEmployees().subscribe(data => {
    //   console.log(data);
    //   this.apiResult = data;
    //   console.log("" +      this.apiResult.Status);
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
  onAccept() {
    // /   / filter    only checked    element;
    const cbsChecked = this.tablist._results.filter(cb => {
      return cb.nativeElement.checked;
    });

    for (var val2 of cbsChecked) {
      this.ledgerIds.push(val2.nativeElement.id);
    }
    // console.log(this.ledgerIds)
    if (this.ledgerIds.length > 0) {
    } else {
      this.swServ.showErrorMessage(
        "Invalid Input!!",
        "Please Select atleast one of the CheckBoxes!!"
      );
    }
  }
  onReject() {
    const cbsChecked = this.tablist._results.filter(cb => {
      return cb.nativeElement.checked;
    });

    for (var val2 of cbsChecked) {
      this.ledgerIds.push(val2.nativeElement.id);
    }
    if (this.ledgerIds.length > 0) {
    } else {
      this.swServ.showErrorMessage(
        "Invalid Input!!",
        "Please Select atleast one of the CheckBoxes!!"
      );
    }
  }
  onDownload() {
    const cbsChecked = this.tablist._results.filter(cb => {
      return cb.nativeElement.checked;
    });
    if (this.isEdle) {
      for (var val2 of cbsChecked) {
        this.selectedEmps.push(val2.nativeElement.id);
      }
      if (this.currentmonth == 0) {
        this.swServ.showErrorMessage(
          "Invalid Input!!",
          "Please Select Month!!"
        );
      } else if (
        this.usrToken == "" ||
        this.usrToken == undefined ||
        this.usrToken == null
      ) {
        this.handleUnauthorizedrequest();
      } else if (this.selectedEmps.length > 0) {
        let pdf = new PDFInput();
        pdf.emps = this.selectedEmps;
        pdf.currentmonth = this.currentmonth;
        this.api
          .downloadpdffilesforemployees(pdf, this.usrToken)
          .subscribe((data: APIResult) => {
            console.log(data);
            let status = data.status;
            let message = data.message;
            if (status) {
              // this.employees = data.employees;
              // this.pageCount = data.queryPages;
              // this.totalCount = data.queryTotalCount;
              // this.pages = this.api.transform(this.pageCount);
              // console.log(data);
            } else {
              this.swServ.showErrorMessage("Failure!!!", message);
            }
          });
      } else {
        this.swServ.showErrorMessage(
          "Invalid Input!!",
          "Please Select atleast one of the CheckBoxes!!"
        );
      }
    } else {
      for (var val2 of cbsChecked) {
        this.ledgerIds.push(val2.nativeElement.id);
      }
      if (this.ledgerIds.length > 0) {
      } else {
        this.swServ.showErrorMessage(
          "Invalid Input!!",
          "Please Select atleast one of the CheckBoxes!!"
        );
      }
    }
  }
  toggleEditable(event) {
    if (event.target.checked) {
      event.target.value = true;
    }
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
    this.subsc3.unsubscribe();
    this.subsc4.unsubscribe();
    this.subsc5.unsubscribe();
    this.subsc6.unsubscribe();
  }
}
