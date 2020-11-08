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
import { SweetService } from "../../sweet.service";
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
  ledgerIds = [];
  employees: Employee[] = [];
  e: Employee;
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  private subsc3: r.Subscription;
  private subsc4: r.Subscription;
  @Input("") edleVerify: string = "";
  @Input("") evheVerify: string = "";
  isEdle: Boolean = false;
  isEvhe: Boolean = false;
  isLe: Boolean = false;
  isHe: Boolean = false;
  apiResult: APIResult;
  ishrvhe: Boolean = false;
  @Input("") hrvheVerify: string = "";
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
      this.ngOnInit();
      // put the code  When you want to router navigate on the same page and want to call ngOnInit()
    });
  }
  getstaticEmployees() {
    const emp: Employee = new Employee();
    const errorTitle: string = "INVALID INPUT!!!";
    emp.EmployeeId = 1;
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
  ngAfterViewInit() {
    this.ngOnInit();
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
    let em: Employee;
    em = this.getstaticEmployees();
    this.e = em;
    //  console.log(em);
    this.employees.push(this.e);
    em = this.getstaticEmployees();
    this.e = em;
    this.e = this.getstaticEmployees();
    this.employees.push(this.e);
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
  toggleEditable(event) {
    if (event.target.checked) {
      event.target.value = true;
    }
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
    this.subsc3.unsubscribe();
  }
}
