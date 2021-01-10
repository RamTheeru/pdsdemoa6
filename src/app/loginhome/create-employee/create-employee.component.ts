import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Employee } from "../../models/employee";
import { APIResult } from "../../models/apiresult";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
import { ViewService } from "../../view.service";
import * as r from "rxjs";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.css"]
})
export class CreateEmployeeComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input("") userType: string;
  @ViewChild("someInput") someInput: ElementRef;
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  edleVerify: string = "";
  isEdle: Boolean = true;
  isLe: Boolean = false;
  isHe: Boolean = false;
  apiResult: APIResult;
  tab1Id = "pills-home";
  tab2Id = "pills-profile";
  tab3Id = "pills-contact";
  hidPrev: Boolean = true;
  hidNext: Boolean = false;
  empId: number;
  formText: string = "Create Employee Form:";
  editMode = false;
  indiView = false;
  activeTab: number;
  childClassess = [];
  empForm2: FormGroup;
  hidTab1: Boolean = false;
  hidTab2: Boolean = true;
  hidTab3: Boolean = true;
  maritals = ["married", "unmarried"];
  empTypes = ["permanent", "contract"];
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private api: PdsApiService,
    private swServ: SweetService,
    private vServ: ViewService
  ) {
    this.initForm();
    if (this.editMode) {
      this.formText = "Edit Employee Form:";
    } else {
      this.formText = "Create Employee Form:";
    }
  }
  ngAfterViewInit() {
    console.log("ElementRef");
    this.childClassess = this.someInput.nativeElement.children;

    for (var val of this.childClassess) {
      //console.log(val.id)
      //console.log(val.className)
      var index = val.className.indexOf("active");
      if (this.isEdle) {
        if (this.tab1Id == val.id && index !== -1) {
          this.activeTab = 1;
          this.showtab(1);
          this.hidPrev = true;
          this.hidNext = false;
        } else if (this.tab2Id == val.id && index !== -1) {
          this.activeTab = 2;
          this.showtab(2);
          this.hidPrev = false;
          this.hidNext = false;
        } else if (this.tab3Id == val.id && index !== -1) {
          this.activeTab = 3;
          this.showtab(3);
          this.hidPrev = false;
          this.hidNext = true;
        }
      } else {
        if (this.tab1Id == val.id && index !== -1) {
          this.activeTab = 1;
          this.showtab(1);
          this.hidPrev = false;
          this.hidNext = false;
        } else if (this.tab2Id == val.id && index !== -1) {
          this.activeTab = 2;
          this.showtab(2);
          this.hidPrev = false;
          this.hidNext = false;
        }
      }
    }
  }
  onchangetab(text: string) {
    if (this.isEdle) {
      if (text == "p") {
        this.activeTab = this.activeTab - 1;
      } else {
        this.activeTab = this.activeTab + 1;
      }
      if (this.activeTab == 3) {
        this.hidPrev = false;
        this.hidNext = true;
      } else if (this.activeTab == 1) {
        this.hidPrev = true;
        this.hidNext = false;
      } else if (this.activeTab == 2) {
        this.hidPrev = false;
        this.hidNext = false;
      }
    } else {
      if (text == "p") {
        this.activeTab = 2;
        this.activeTab = this.activeTab - 1;
      } else {
        this.activeTab = 1;
        this.activeTab = this.activeTab + 1;
      }
      this.hidPrev = false;
      this.hidNext = false;
    }

    console.log(this.activeTab);
    this.showtab(this.activeTab);
  }

  showtab(tabNum) {
    if (tabNum == 1) {
      this.hidTab1 = false;
      this.hidTab2 = true;
      this.hidTab3 = true;
    } else if (tabNum == 2) {
      this.hidTab1 = true;
      this.hidTab2 = false;
      this.hidTab3 = true;
    } else if (tabNum == 3) {
      this.hidTab1 = true;
      this.hidTab2 = true;
      this.hidTab3 = false;
    }
  }

  ngOnInit() {
    this.hidTab1 = false;
    this.hidTab2 = true;
    this.hidTab3 = true;
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.userType = val;
    });

    this.subsc2 = this.vServ.verify.subscribe((val: string) => {
      this.edleVerify = val;
    });
    var index = this.userType.indexOf("le");
    if (index !== -1) {
      this.isLe = true;
      this.isHe = false;
      console.log("edle : " + this.edleVerify);
      if (this.edleVerify == "edle") {
        this.isEdle = false;
        this.hidPrev = false;
        this.hidNext = false;
        this.showtab(1);
      } else {
        this.isEdle = true;
      }
    } else {
      this.isHe = true;
      //this.isEdle = false;
    }
    this.route.params.subscribe((params: Params) => {
      this.empId = +params["id"];
      let vw = this.route.url["_value"];
      let str = vw[0].path;
      let index = str.indexOf("individual");
      console.log(index);
      // if(index!=="-1")
      // {
      //   this.showbtns = true;
      // }
      // else{
      //   this.showbtns = false;
      // }
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }
  private initForm() {
    if (this.editMode) {
      let eDate = new FormControl(new Date("09/15/1990"));
      this.empForm2 = this._fb.group({
        firstName: new FormControl("testfirst"),
        lastName: new FormControl("testlast"),
        middleName: new FormControl("middleNametest"),
        birthdate: eDate, //new FormControl('09/15/1990'),
        joindate: eDate, //new FormControl('09/15/2020'),
        //  day: new FormControl(),
        //   month: new FormControl(''),
        //    year: new FormControl(),
        age: new FormControl("28"),
        bg: new FormControl("BPositive"),
        gender: new FormControl("male"),
        married: new FormControl(),
        unmarried: new FormControl("true"),
        permanent: new FormControl("true"),
        contract: new FormControl(),
        // mars:new FormArray([]),
        ad1: new FormControl("testad1"),
        ad2: new FormControl("testad2"),
        place: new FormControl("testplace"),
        state: new FormControl("teststate"),
        postal: new FormControl("testpostal"),
        aad: new FormControl("aadtest"),
        pan: new FormControl("pantest"),
        //typs : new FormArray([]),
        phone: new FormControl("313131"),
        gName: new FormControl("stestgnamde"),
        gphone: new FormControl("313131"),
        //    day2: new FormControl(),
        // month2: new FormControl(''),
        //  year2: new FormControl(),
        // ut: new FormControl(''),
        // desg: new FormControl("Su"),
        empc: new FormControl("Emp123"),

        station: new FormControl("teststation"),
        location: new FormControl("testloaction"),
        account: new FormControl("3242533"),
        ifsc: new FormControl("ICIC21421"),
        bank: new FormControl("ICIC"),
        bbranch: new FormControl("Hitech"),
        veh: new FormControl("testvehicle"),
        dllr: new FormControl("testdl"),
        dlstat: new FormControl("DL")
      });
    } else {
      this.empForm2 = this._fb.group({
        firstName: new FormControl(),
        lastName: new FormControl(),
        middleName: new FormControl(),
        birthdate: new FormControl(),
        joindate: new FormControl(),
        //  day: new FormControl(),
        //   month: new FormControl(''),
        //    year: new FormControl(),
        age: new FormControl(),
        bg: new FormControl(),
        gender: new FormControl(""),
        married: new FormControl(),
        unmarried: new FormControl(),
        permanent: new FormControl(),
        contract: new FormControl(),
        // mars:new FormArray([]),
        ad1: new FormControl(),
        ad2: new FormControl(),
        place: new FormControl(),
        state: new FormControl(),
        postal: new FormControl(),
        aad: new FormControl(),
        pan: new FormControl(),
        phone: new FormControl(),
        //typs : new FormArray([]),
        gName: new FormControl(),
        gphone: new FormControl(),
        //    day2: new FormControl(),
        // month2: new FormControl(''),
        //  year2: new FormControl(),
        //   ut: new FormControl(''),
        desg: new FormControl(""),
        station: new FormControl(),
        location: new FormControl(),
        account: new FormControl(),
        ifsc: new FormControl(),
        bank: new FormControl(),
        bbranch: new FormControl(),
        veh: new FormControl(),
        dllr: new FormControl(),
        dlstat: new FormControl("")
      });
    }
  }
  onSubmit() {
    const emp: Employee = new Employee();
    const errorTitle: string = "INVALID INPUT!!!";
    //this.loaded = true;
    // const selectedmaritals = this.empForm.value.mars
    //   .map((checked, i) => checked ? this.maritals[i].name : null)
    //   .filter(v => v !== null);
    //   console.log('checkboxes')
    //   console.log(selectedmaritals);

    //   const selectempTypes = this.empForm.value.typs
    //   .map((checked, i) => checked ? this.empTypes[i].name : null)
    //   .filter(v => v !== null);
    //   console.log('checkboxes')
    //   console.log(selectempTypes);
    emp.FirstName = this.empForm2.value["firstName"];
    emp.LastName = this.empForm2.value["lastName"];
    emp.MiddleName = this.empForm2.value["middleName"];
    emp.Phone = this.empForm2.value["phone"];
    //  emp.Day = this.empForm2.value['day'];
    //  emp.Month = this.empForm2.value['month'];
    //  emp.Year = this.empForm2.value['year'];

    emp.Age = this.empForm2.value["age"];
    emp.BloodGroup = this.empForm2.value["bg"];
    emp.Gender = this.empForm2.value["gender"];
    //  if(selectedmaritals.length>0)
    //  {
    //   emp.Marital = selectedmaritals[0];
    //   if(emp.Marital == "Married"){
    //     emp.MaritalStatus = true;
    //   }
    //   else{emp.MaritalStatus= false;}
    //  }
    //  else{
    //    emp.MaritalStatus= false;
    //      var txt = '';
    //     var f = 'Employee Marital Status';
    //      this.showrequiredMessage(f,'',errorTitle);
    //    }

    //  if(selectempTypes.length>0)
    //  {
    //     emp.Employeetype = selectempTypes[0];
    //     if(emp.Employeetype == "Permanent"){
    //     emp.IsPermanent = true;
    //   }
    //   else{emp.IsPermanent= false;}
    //  }
    //  else
    //  {
    //    emp.IsPermanent= false;
    //     var txt = '';
    //     var f = 'Employee Type ';
    //     this.showrequiredMessage(f,'',errorTitle);

    //    }

    emp.Address1 = this.empForm2.value["ad1"];
    emp.Address2 = this.empForm2.value["ad2"];
    emp.Place = this.empForm2.value["place"];
    emp.State = this.empForm2.value["state"];
    emp.PostalCode = this.empForm2.value["postal"];
    emp.AAdharNumber = this.empForm2.value["aad"];
    emp.PANNumber = this.empForm2.value["pan"];
    emp.Gaurd_FirstName = this.empForm2.value["gName"];

    emp.Gaurd_PhoneNumber = this.empForm2.value["gphone"];
    emp.DOB = this.empForm2.value["birthdate"];
    emp.DOJ = this.empForm2.value["joindate"];
    // emp.Day2 = this.empForm2.value['day2'];
    // emp.Month2 = this.empForm2.value['month2'];
    // emp.Year2 = this.empForm2.value['year2'];
    emp.LoginType = this.empForm2.value["ut"];
    // emp.Designation = this.empForm2.value["desg"];empc
    emp.EmpCode = this.empForm2.value["empc"];
    emp.StationCode = this.empForm2.value["station"];
    emp.LocationName = this.empForm2.value["location"];
    emp.DLLRStatus = this.empForm2.value["dlstat"];
    emp.VehicleNumber = this.empForm2.value["veh"];
    emp.DLLRNumber = this.empForm2.value["dllr"];
    emp.BankAccountNumber = this.empForm2.value["account"];
    emp.BankName = this.empForm2.value["bank"];
    emp.IFSCCode = this.empForm2.value["ifsc"];
    emp.IFSCCode = this.empForm2.value["bbranch"];
    console.log("on submit.....");

    console.log(emp);

    //  setTimeout(function(){
    //     this.loaded=false;

    //  },2000);
  }

  focusOutFunction(field, event: any): void {
    const errorTitle: string = "INVALID INPUT!!!";
    var txt = event.target.value;
    if (field == "fname") {
      var f = "First Name";
      this.showrequiredMessage(f, txt, errorTitle);
    }
    if (field == "phone") {
      var f = "Employee Contact Number";
      this.showrequiredMessage(f, txt, errorTitle);
    }
  }
  showrequiredMessage(field, txt, title) {
    var test = false;
    if (txt == "" || txt == null) {
      var msg = field + " " + " field required!!";
      // this._swServ.showErrorMessage(title,msg);
    } else if (field == "Employee Contact Number") {
      var msg = field + " " + " contains Only Numbers!!";
      test = this.ValidateNumbers(txt);
      if (!test) {
        //  this._swServ.showErrorMessage(title,msg);
      }
    }
  }

  ValidateNumbers(txt: string): boolean {
    var val = false;
    var regexp = new RegExp("^[0-9]+$");
    val = regexp.test(txt);
    return val;
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
  }
}
