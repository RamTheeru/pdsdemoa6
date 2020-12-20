import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
const moment = _rollupMoment || _moment;
import { MY_FORMATS } from "../models/dateformats";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { PdsApiService } from "../pds-api.service";
import { SweetService } from "../sweet.service";
import { UserType } from "../models/usertype";
import { RegisterEmployee } from "../models/registeremployee";
import { APIResult } from "../models/apiresult";
import { Designation } from "../models/designation";
import { Station } from "../models/station";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [
    SweetService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class RegisterComponent implements OnInit {
  //employee
  loaded: boolean = false;
  result: APIResult;
  dates = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];
  userTypes: UserType[];
  designatons: Designation[];
  stations: Station[];
  empForm: FormGroup;
  maritals = ["married", "unmarried"];

  empTypes = ["permanent", "contract"];

  constructor(
    private _fb: FormBuilder,
    private api: PdsApiService,
    private _swServ: SweetService
  ) {
    //this.addCheckboxes();
    //this.addCheckboxes_t();
  }

  ngOnInit() {
    this.initForm();
    this.result = new APIResult();
    this.api.getConstants().subscribe(
      (data: APIResult) => {
        //console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
          this.userTypes = data.usertypes;
          this.designatons = data.designations;
          this.stations = data.stations;
        } else {
          this._swServ.showErrorMessage("Error!!", m);
        }
      },
      err => {
        //console.log(err.message);
        this._swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );
    //  console.log('UserTypes :'+this.empTypes );
    //this.addCheckboxes();
  }

  initForm() {
    this.empForm = this._fb.group({
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
      usr: new FormControl(),
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
      gfirstName: new FormControl(),
      glastName: new FormControl(),
      gmiddleName: new FormControl(),
      gphone: new FormControl(),
      day2: new FormControl(),
      month2: new FormControl(""),
      year2: new FormControl(),
      ut: new FormControl(""),
      // desg: new FormControl(""),
      station: new FormControl(""),
      location: new FormControl()
    });
  }
  get maritalsFormArray() {
    return this.empForm.controls.mars as FormArray;
  }
  private addCheckboxes() {
    this.maritals.forEach(() =>
      this.maritalsFormArray.push(new FormControl(false))
    );
  }
  private addCheckboxes_t() {
    this.empTypes.forEach(() =>
      this.typsFormArray.push(new FormControl(false))
    );
  }
  get typsFormArray() {
    return this.empForm.controls.typs as FormArray;
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  onSubmit() {
    //gjh
    const emp: RegisterEmployee = new RegisterEmployee();
    let st = this.empForm.value["station"];
    let db = this.convert(this.empForm.value["birthdate"]);
    let dj = this.convert(this.empForm.value["joindate"]);
    let marit = this.empForm.value["married"];
    console.log(marit);
    const errorTitle: string = "INVALID INPUT!!!";
    //this.loaded = true;
    // const selectedmaritals = this.empForm.value.mars
    //   .map((checked, i) => (checked ? this.maritals[i] : null))
    //   .filter(v => v !== null);
    // console.log("checkboxes");
    // console.log(selectedmaritals);

    //   const selectempTypes = this.empForm.value.typs
    //   .map((checked, i) => checked ? this.empTypes[i].name : null)
    //   .filter(v => v !== null);
    //   console.log('checkboxes')
    //   console.log(selectempTypes);
    emp.FirstName = this.empForm.value["firstName"];
    emp.LastName = this.empForm.value["lastName"];
    emp.MiddleName = this.empForm.value["middleName"];
    emp.Phone = this.empForm.value["phone"];
    emp.DOB = db;
    emp.DOJ = dj;
    //emp.Marital = marit;
    // emp.Day = this.empForm.value["day"];
    // emp.Month = this.empForm.value["month"];
    // emp.Year = this.empForm.value["year"];

    emp.EmpAge = this.empForm.value["age"];
    emp.BloodGroup = this.empForm.value["bg"];
    emp.Gender = this.empForm.value["gender"];
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
    emp.UserName = this.empForm.value["usr"];
    emp.Address1 = this.empForm.value["ad1"];
    emp.Adress2 = this.empForm.value["ad2"];
    emp.Place = this.empForm.value["place"];
    emp.State = this.empForm.value["state"];
    emp.PostalCode = this.empForm.value["postal"];
    emp.AAdharNumber = this.empForm.value["aad"];
    emp.PAN = this.empForm.value["pan"];
    emp.Guard_FirstName = this.empForm.value["gfirstName"];
    emp.Guard_LastName = this.empForm.value["glastName"];
    emp.Guard_MiddleName = this.empForm.value["gmiddleName"];
    emp.Guard_Phone = this.empForm.value["gphone"];
    // emp.Day2 = this.empForm.value["day2"];
    // emp.Month2 = this.empForm.value["month2"];
    // emp.Year2 = this.empForm.value["year2"];
    emp.LoginType = this.empForm.value["ut"];
    // emp.Designation = this.empForm.value["desg"];
    emp.StationId = st.stationId;
    emp.StationCode = st.stationCode;
    emp.LocationName = this.empForm.value["location"];
    console.log(emp);
    //console.log('on submit.....');
    // this.api.registeremployee(emp).subscribe(
    //   (data: APIResult) => {
    //     //console.log(data);
    //     let status: Boolean = data.status;
    //     let m: string = data.message;
    //     if (status) {
    //       this.userTypes = data.usertypes;
    //       this.designatons = data.designations;
    //       this._swServ.showSuccessMessage("Success!!!", m);
    //     } else {
    //       this._swServ.showErrorMessage("Error!!", m);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //     this._swServ.showErrorMessage("Network Error!!!", err.message);
    //   }
    // );
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
      this._swServ.showErrorMessage(title, msg);
    } else if (field == "Employee Contact Number") {
      var msg = field + " " + " contains Only Numbers!!";
      test = this.ValidateNumbers(txt);
      if (!test) {
        this._swServ.showErrorMessage(title, msg);
      }
    }
  }

  ValidateNumbers(txt: string): boolean {
    var val = false;
    var regexp = new RegExp("^[0-9]+$");
    val = regexp.test(txt);
    return val;
  }
  checkValue(event: any, field) {
    const emp: RegisterEmployee = new RegisterEmployee();
    const errorTitle: string = "INVALID INPUT!!!";
    if (field == "mars") {
      // const selectedmaritals = this.empForm.value.mars
      //     .map((checked, i) => checked ? this.maritals[i].name : null)
      //     .filter(v => v !== null);
      //   if(selectedmaritals.length>0)
      //   {
      //     emp.Marital = selectedmaritals[0];
      //     if(emp.Marital == "Married"){
      //       emp.MaritalStatus = true;
      //     }
      //     else{
      //       emp.MaritalStatus= false;
      //       }
      //   }
      //   else
      //   {
      //     emp.MaritalStatus= false;
      //       var txt = '';
      //       var f = 'Employee Marital Status';
      //       this.showrequiredMessage(f,'',errorTitle);
      //   }
    } else {
      //     const selectempTypes = this.empForm.value.typs
      // .map((checked, i) => checked ? this.empTypes[i].name : null)
      // .filter(v => v !== null);
      // if(selectempTypes.length>0)
      // {
      //   emp.Employeetype = selectempTypes[0];
      //     if(emp.Employeetype == "Permanent"){
      //     emp.IsPermanent = true;
      //   }
      //   else{emp.IsPermanent= false;}
      // }
      // else
      // {
      //   emp.IsPermanent= false;
      //     var txt = '';
      //     var f = 'Employee Type ';
      //     this.showrequiredMessage(f,'',errorTitle);
      // }
    }
  }
}
