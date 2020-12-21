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
const emp: RegisterEmployee = new RegisterEmployee();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  //employee
  fvalid: boolean = true;
  loaded: boolean = false;
  result: APIResult;
  checkMarried: boolean = false;
  checkUnMarried: boolean = false;
  checkPermanent: boolean = false;
  checkContract: boolean = false;
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
    // const emp: RegisterEmployee = new RegisterEmployee();
    const errorTitle: string = "INVALID INPUT!!!";

    let st = this.empForm.value["station"];
    let db = this.convert(this.empForm.value["birthdate"]);
    let dj = this.convert(this.empForm.value["joindate"]);

    let loginusr = this.empForm.value["ut"];
    // let marit = this.empForm.value["married"];

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
    emp.LoginType = loginusr.user;
    emp.UserTypeId = loginusr.userTypeId;
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

    emp.StationId = st.stationId;
    emp.StationCode = st.stationCode;

    emp.LocationName = this.empForm.value["location"];
    if (
      emp.LocationName == "" ||
      emp.LocationName == null ||
      emp.LocationName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Location Name", "", errorTitle);
    }
    if (
      emp.StationId == 0 ||
      emp.StationCode == "" ||
      emp.StationId == null ||
      emp.StationCode == "" ||
      emp.StationId == undefined ||
      emp.StationCode == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Station", "", errorTitle);
    }
    if (
      emp.LoginType == "" ||
      emp.UserTypeId == 0 ||
      emp.LoginType == null ||
      emp.UserTypeId == null ||
      emp.LoginType == undefined ||
      emp.UserTypeId == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Login Type", "", errorTitle);
    }
    if (
      emp.UserName == "" ||
      emp.UserName == null ||
      emp.UserName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee User Name", "", errorTitle);
    }
    if (emp.DOJ == "" || emp.DOJ == null || emp.DOJ == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Date Of Join", "", errorTitle);
    }

    this.showrequiredMessage("Employee Contact Number", emp.Phone, errorTitle);
    if (
      emp.Employeetype == "" ||
      emp.Employeetype == null ||
      emp.Employeetype == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Type Status", "", errorTitle);
    }
    if (emp.Marital == "" || emp.Marital == null || emp.Marital == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Marital Status", "", errorTitle);
    }
    if (this.checkContract == true && this.checkPermanent == true) {
      this.fvalid = false;
      this.showrequiredMessage(
        "Employee Type Status",
        "Please Select Proper option",
        errorTitle
      );
    }
    if (this.checkMarried == true && this.checkUnMarried == true) {
      this.fvalid = false;
      this.showrequiredMessage(
        "Employee Marital Status",
        "Please Select Proper option",
        errorTitle
      );
    }
    if (emp.PAN == "" || emp.PAN == null || emp.PAN == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee PAN", "", errorTitle);
    }
    if (
      emp.AAdharNumber == "" ||
      emp.AAdharNumber == null ||
      emp.AAdharNumber == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee AAdhar", "", errorTitle);
    }
    if (
      emp.PostalCode == "" ||
      emp.PostalCode == null ||
      emp.PostalCode == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee State", "", errorTitle);
    }
    if (emp.State == "" || emp.State == null || emp.State == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee State", "", errorTitle);
    }
    if (emp.Place == "" || emp.Place == null || emp.Place == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Place", "", errorTitle);
    }
    if (
      emp.Address1 == "" ||
      emp.Adress2 == "" ||
      emp.Address1 == null ||
      emp.Adress2 == null ||
      emp.Address1 == undefined ||
      emp.Adress2 == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Address", "", errorTitle);
    }
    this.showrequiredMessage("Employee AGE", emp.EmpAge, errorTitle);
    if (emp.DOB == "" || emp.DOB == null || emp.DOB == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Date Of Birth", "", errorTitle);
    }
    if (emp.Gender == "" || emp.Gender == null || emp.Gender == undefined) {
      this.fvalid = false;
      this.showrequiredMessage("Employee Gender", "", errorTitle);
    }
    if (
      emp.FirstName == "" ||
      emp.FirstName == null ||
      emp.FirstName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage("Employee First Name", "", errorTitle);
    }

    console.log(JSON.stringify(emp));
    this.fvalid = false;
    //console.log('on submit.....');
    if (this.fvalid) {
      this.submittoAPI(emp);
    }
    //  setTimeout(function(){
    //     this.loaded=false;

    //  },2000);
  }
  submittoAPI(regemploy): void {
    this.api.registeremployee(regemploy).subscribe(
      (data: APIResult) => {
        //console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
          this.userTypes = data.usertypes;
          this.designatons = data.designations;
          this._swServ.showSuccessMessage("Success!!!", m);
        } else {
          this._swServ.showErrorMessage("Error!!", m);
        }
      },
      err => {
        console.log(err);
        this._swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );
  }
  focusOutFunction(field, event: any): void {
    const errorTitle: string = "INVALID INPUT!!!";
    var txt = event.target.value;
    if (field == "fname") {
      var f = "First Name";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "phone") {
      var f = "Employee Contact Number";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "age") {
      var f = "Employee AGE";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "ad1") {
      var f = "Employee Address";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "place") {
      var f = "Employee Place";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "state") {
      var f = "Employee State";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "post") {
      var f = "Employee Postal Code";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "aad") {
      var f = "Employee AAdhar Code";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "pan") {
      var f = "Employee PAN Number";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "usr") {
      var f = "Employee User Name";
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == "loc") {
      var f = "Employee Location Name";
      this.showrequiredMessage(f, txt, errorTitle);
    } else {
      this.fvalid = true;
    }
  }
  showrequiredMessage(field, txt, title) {
    var test = false;
    if (txt == "" || txt == null) {
      var msg = field + " " + " field required!!";
      this.fvalid = false;
      this._swServ.showErrorMessage(title, msg);
    } else if (field == "Employee Contact Number" || field == "Employee AGE") {
      var msg = field + " " + " contains Only Numbers!!";
      test = this.ValidateNumbers(txt);
      if (!test) {
        this.fvalid = false;
        this._swServ.showErrorMessage(title, msg);
      }
    } else if (
      field == "Employee Type Status" ||
      field == "Employee Marital Status"
    ) {
      this.fvalid = false;
      this._swServ.showErrorMessage(title, txt);
    }
  }

  ValidateNumbers(txt: string): boolean {
    var val = false;
    var regexp = new RegExp("^[0-9]+$");
    val = regexp.test(txt);
    return val;
  }
  checkValue(event: any, field) {
    // console.log(event.checked);
    // console.log(event.source.value);

    const errorTitle: string = "INVALID INPUT!!!";
    if (field == "m") {
      let v = event.source.value;
      if (!event.checked) {
        var txt = "";
        this.checkMarried = false;
        this.checkUnMarried = false;
        var f = "Employee Marital Status";
        this.showrequiredMessage(f, "", errorTitle);
      } else {
        emp.Marital = v;
        if (v == "married") {
          this.checkMarried = true;
          emp.MaritalStatus = true;
        } else if (v == "unmarried") {
          this.checkUnMarried = true;
          emp.MaritalStatus = false;
        }
      }
    } else if (field == "e") {
      let v = event.source.value;
      if (!event.checked) {
        var txt = "";
        this.checkPermanent = false;
        this.checkContract = false;
        var f = "Employee Type Status";
        this.showrequiredMessage(f, "", errorTitle);
      } else {
        emp.Employeetype = v;
        if (v == "permanent") {
          this.checkPermanent = true;
          emp.IsPermanent = true;
        } else if (v == "contract") {
          this.checkContract = true;
          emp.IsPermanent = false;
        }
      }
    }
  }
}
