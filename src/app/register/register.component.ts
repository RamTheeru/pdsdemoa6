import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import { MY_FORMATS } from '../models/dateformats';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { PdsApiService } from '../pds-api.service';
import { SweetService } from '../sweet.service';
import { UserType } from '../models/usertype';
import { RegisterEmployee } from '../models/registeremployee';
import { Pdsemployee } from '../models/pdsemployee';
import { APIResult } from '../models/apiresult';
import { Designation } from '../models/designation';
import { Station } from '../models/station';
var emp: Pdsemployee = new Pdsemployee();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
  maritals = ['married', 'unmarried'];

  empTypes = ['permanent', 'contract'];

  constructor(
    private _fb: FormBuilder,
    private api: PdsApiService,
    private _swServ: SweetService,
    private router: Router
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
          this._swServ.showErrorMessage('Error!!', m);
        }
      },
      err => {
        //console.log(err.message);
        this._swServ.showErrorMessage('Network Error!!!', err.message);
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
      email: new FormControl(),
      birthdate: new FormControl(),
      joindate: new FormControl(),
      //  day: new FormControl(),
      //   month: new FormControl(''),
      //    year: new FormControl(),
      age: new FormControl(),
      bg: new FormControl(''),
      usr: new FormControl(),
      gender: new FormControl(''),
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
      dist: new FormControl(),
      aad: new FormControl(),
      pan: new FormControl(),
      phone: new FormControl(),
      //typs : new FormArray([]),
      gfirstName: new FormControl(),
      glastName: new FormControl(),
      gmiddleName: new FormControl(),
      gphone: new FormControl(),
      day2: new FormControl(),
      month2: new FormControl(''),
      year2: new FormControl(),
      ut: new FormControl(''),
      // desg: new FormControl(""),
      station: new FormControl(''),
      location: new FormControl(),
      pMName: new FormControl(),
      bankCName: new FormControl(),
      account: new FormControl(),
      ifsc: new FormControl(),
      bank: new FormControl(),
      bbranch: new FormControl(),
      veh: new FormControl(),
      dllr: new FormControl(),
      dlstat: new FormControl(''),
      lissdate: new FormControl(),
      lexpdate: new FormControl(),
      phy: new FormControl(''),
      gpapNum: new FormControl(),
      gpapIns: new FormControl(),
      gpaexpdate: new FormControl(),
      gmcpNum: new FormControl(),
      gmcpIns: new FormControl(),
      gmcexpdate: new FormControl(),
      inde: new FormControl(''),
      hcstat: new FormControl(''),
      hcsNum: new FormControl(),
      esicNum: new FormControl(),
      esicCNum: new FormControl(),
      pfmemNum: new FormControl(),
      uan: new FormControl(),
      cenddate: new FormControl()
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
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  onSubmit() {
    //gjh
    // const emp: RegisterEmployee = new RegisterEmployee();
    const errorTitle: string = 'INVALID INPUT!!!';
    //  this.fvalid = false;
    let st = this.empForm.value['station'];
    let db = this.convert(this.empForm.value['birthdate']);
    let dj = this.convert(this.empForm.value['joindate']);
    let lis = this.convert(this.empForm.value['lissdate']);
    let led = this.convert(this.empForm.value['lexpdate']);
    let gpaed = this.convert(this.empForm.value['gpaexpdate']);
    let gmced = this.convert(this.empForm.value['gmcexpdate']);
    let cend = this.convert(this.empForm.value['cenddate']);
    let loginusr = this.empForm.value['ut'];
    // let marit = this.empForm.value["married"];
    emp.GPAPolicyExpiryDate = gpaed;
    emp.GMCPolicyExpiryDate = gmced;
    emp.GPAPolicyInsurer = this.empForm.value['gpapIns'];
    emp.GMCPolicyInsurer = this.empForm.value['gmcpIns'];
    emp.GPAPolicyNumber = this.empForm.value['gpapNum'];
    emp.GMCPolicyNumber = this.empForm.value['gmcpNum'];
    emp.ESICCardNumber = this.empForm.value['esicCNum'];
    emp.ESICNo = this.empForm.value['esicNum'];
    emp.PfMembershipNumber = this.empForm.value['pfmemNum'];
    emp.UAN = this.empForm.value['uan'];
    emp.HealthCardNumber = this.empForm.value['hcsNum'];
    emp.HealthCardStatus = this.empForm.value['hcstat'];
    if (emp.HealthCardStatus.toLowerCase().trim() == 'yes') {
      emp.IsHealthCard = true;
    }
    emp.ContractEndDate = cend;
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
    emp.FirstName = this.empForm.value['firstName'];
    emp.LastName = this.empForm.value['lastName'];
    emp.MiddleName = this.empForm.value['middleName'];
    emp.Email = this.empForm.value['email'];
    emp.Phone = this.empForm.value['phone'];
    emp.DOB = db;
    emp.DOJ = dj;
    //emp.Marital = marit;
    // emp.Day = this.empForm.value["day"];
    // emp.Month = this.empForm.value["month"];
    // emp.Year = this.empForm.value["year"];
    emp.EmpAge = this.empForm.value['age'];
    emp.BloodGroup = this.empForm.value['bg'];
    emp.Gender = this.empForm.value['gender'];
    emp.LoginType = loginusr.user;
    emp.UserTypeId = loginusr.userTypeId;
    emp.District = this.empForm.value['dist'];
    emp.MotherName = this.empForm.value['pMName'];
    emp.EmployeeNameasperBank = this.empForm.value['bankCName'];
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
    emp.UserName = this.empForm.value['usr'];

    emp.Address1 = this.empForm.value['ad1'];
    emp.Address2 = this.empForm.value['ad2'];

    emp.Place = this.empForm.value['place'];

    emp.State = this.empForm.value['state'];

    emp.PostalCode = this.empForm.value['postal'];

    emp.AAdharNumber = this.empForm.value['aad'];

    emp.PANNumber = this.empForm.value['pan'];

    emp.Gaurd_FirstName = this.empForm.value['gfirstName'];
    emp.Gaurd_LastName = this.empForm.value['glastName'];
    emp.Gaurd_MiddleName = this.empForm.value['gmiddleName'];
    emp.Gaurd_PhoneNumber = this.empForm.value['gphone'];
    emp.DLLRStatus = this.empForm.value['dlstat'];
    emp.VehicleNumber = this.empForm.value['veh'];
    emp.DLLRNumber = this.empForm.value['dllr'];
    emp.BankAccountNumber = this.empForm.value['account'];
    emp.BankName = this.empForm.value['bank'];
    emp.IFSCCode = this.empForm.value['ifsc'];
    emp.BranchName = this.empForm.value['bbranch'];
    emp.IssuedDate = lis;
    emp.ExpiryDate = led;
    // emp.Day2 = this.empForm.value["day2"];
    // emp.Month2 = this.empForm.value["month2"];
    // emp.Year2 = this.empForm.value["year2"];
    emp.PhysicallyHandicapStatus = this.empForm.value['phy'];
    if (emp.PhysicallyHandicapStatus.toLowerCase().trim() == 'yes') {
      emp.IsPhysicallyHandicapped = true;
    }
    emp.Indemunity_Bond = this.empForm.value['inde'];
    emp.StationId = st.stationId;
    emp.StationCode = st.stationCode;

    emp.LocationName = this.empForm.value['location'];
    if (
      emp.LocationName == '' ||
      emp.LocationName == null ||
      emp.LocationName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Location Name', '', errorTitle);
    } else if (
      emp.StationId == 0 ||
      emp.StationCode == '' ||
      emp.StationId == null ||
      emp.StationCode == '' ||
      emp.StationId == undefined ||
      emp.StationCode == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Station', '', errorTitle);
    } else if (
      emp.LoginType == '' ||
      emp.UserTypeId == 0 ||
      emp.LoginType == null ||
      emp.UserTypeId == null ||
      emp.LoginType == undefined ||
      emp.UserTypeId == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Login Type', '', errorTitle);
    } else if (
      emp.UserName == '' ||
      emp.UserName == null ||
      emp.UserName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee User Name', '', errorTitle);
    } else if (emp.DOJ == '' || emp.DOJ == null || emp.DOJ == undefined) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Date Of Join', '', errorTitle);
    } else if (
      emp.Employeetype == '' ||
      emp.Employeetype == null ||
      emp.Employeetype == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Type Status', '', errorTitle);
    } else if (
      emp.Marital == '' ||
      emp.Marital == null ||
      emp.Marital == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Marital Status', '', errorTitle);
    } else if (this.checkContract == true && this.checkPermanent == true) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee Type Status',
        'Please Select Proper Employee Type option',
        errorTitle
      );
    } else if (this.checkContract == false && this.checkPermanent == false) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee Type Status',
        'Please Select Proper Employee Type option',
        errorTitle
      );
    } else if (this.checkMarried == true && this.checkUnMarried == true) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee Marital Status',
        'Please Select Proper Employee Marital option',
        errorTitle
      );
    } else if (this.checkMarried == false && this.checkUnMarried == false) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee Marital Status',
        'Please Select Proper Employee Marital option',
        errorTitle
      );
    } else if (
      emp.PANNumber == '' ||
      emp.PANNumber == null ||
      emp.PANNumber == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee PAN', '', errorTitle);
    } else if (
      emp.AAdharNumber == '' ||
      emp.AAdharNumber == null ||
      emp.AAdharNumber == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee AAdhar', '', errorTitle);
    } else if (
      emp.PostalCode == '' ||
      emp.PostalCode == null ||
      emp.PostalCode == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee PostalCode', '', errorTitle);
    } else if (
      emp.EmployeeNameasperBank == '' ||
      emp.EmployeeNameasperBank == null ||
      emp.EmployeeNameasperBank == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee EmployeeName as per Bank',
        '',
        errorTitle
      );
    } else if (
      emp.BankAccountNumber == '' ||
      emp.BankAccountNumber == null ||
      emp.BankAccountNumber == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Account Number', '', errorTitle);
    } else if (
      emp.BankName == '' ||
      emp.BankName == null ||
      emp.BankName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Bank Name', '', errorTitle);
    } else if (
      emp.IFSCCode == '' ||
      emp.IFSCCode == null ||
      emp.IFSCCode == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee IFSC Code', '', errorTitle);
    } else if (
      emp.BranchName == '' ||
      emp.BranchName == null ||
      emp.BranchName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Branch Name', '', errorTitle);
    } else if (
      emp.IssuedDate == '' ||
      emp.IssuedDate == null ||
      emp.IssuedDate == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee License Date Of Issued',
        '',
        errorTitle
      );
    } else if (
      emp.ExpiryDate == '' ||
      emp.ExpiryDate == null ||
      emp.ExpiryDate == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee License Date Of Expired',
        '',
        errorTitle
      );
    } else if (
      emp.DLLRStatus == '' ||
      emp.DLLRStatus == null ||
      emp.DLLRStatus == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee DL/LLR Status', '', errorTitle);
    } else if (
      emp.DLLRNumber == '' ||
      emp.DLLRNumber == null ||
      emp.DLLRNumber == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee Driving or Lisence Number',
        '',
        errorTitle
      );
    } else if (
      emp.VehicleNumber == '' ||
      emp.VehicleNumber == null ||
      emp.VehicleNumber == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Vehicle Number', '', errorTitle);
    } else if (
      emp.District == '' ||
      emp.District == null ||
      emp.District == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee District', '', errorTitle);
    } else if (emp.State == '' || emp.State == null || emp.State == undefined) {
      this.fvalid = false;
      this.showrequiredMessage('Employee State', '', errorTitle);
    } else if (emp.Place == '' || emp.Place == null || emp.Place == undefined) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Place', '', errorTitle);
    } else if (
      emp.Address1 == '' ||
      emp.Address2 == '' ||
      emp.Address1 == null ||
      emp.Address2 == null ||
      emp.Address1 == undefined ||
      emp.Address2 == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Address', '', errorTitle);
    } else if (emp.DOB == '' || emp.DOB == null || emp.DOB == undefined) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Date Of Birth', '', errorTitle);
    } else if (
      emp.PhysicallyHandicapStatus == '' ||
      emp.PhysicallyHandicapStatus == null ||
      emp.PhysicallyHandicapStatus == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage(
        'Employee PhysicallyHandicapStatus',
        '',
        errorTitle
      );
    } else if (
      emp.Gender == '' ||
      emp.Gender == null ||
      emp.Gender == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Gender', '', errorTitle);
    } else if (emp.Email == '' || emp.Email == null || emp.Email == undefined) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Email Address', '', errorTitle);
    } else if (
      emp.FirstName == '' ||
      emp.FirstName == null ||
      emp.FirstName == undefined
    ) {
      this.fvalid = false;
      this.showrequiredMessage('Employee First Name', '', errorTitle);
    } else if (emp.Phone == '' || emp.Phone == null || emp.Phone == undefined) {
      this.fvalid = false;
      this.showrequiredMessage('Employee Contact Number', '', errorTitle);
    } else if (
      emp.EmpAge == '' ||
      emp.EmpAge == null ||
      emp.EmpAge == undefined
    ) {
      //
      this.fvalid = false;
      this.showrequiredMessage('Employee AGE', '', errorTitle);
    } else if (this.fvalid) {
      //  var isPaused = true;
      // this.validateNonEmptyfilelds(emp.EmpCode,"empc");

      this.validateallnonemptyfields();
      if (this.fvalid) {
        emp.HouseNo = emp.Address1;
        emp.StreetName = emp.Address2;
        emp.FatherName = emp.Gaurd_FirstName;
        emp.IsActive = false;
        if (
          emp.MotherName == '' ||
          emp.MotherName == null ||
          emp.MotherName == undefined
        ) {
          emp.MotherName = 'default';
        }
        if (
          emp.PANNumber != '' &&
          emp.PANNumber != null &&
          emp.PANNumber != undefined
        ) {
          emp.PANStatus = 'Yes';
        } else {
          emp.PANStatus = 'No';
        }
        if (emp.MaritalStatus) {
          emp.IsMarried = 'Yes';
        } else {
          emp.IsMarried = 'No';
        }
        emp.RefContactNumber = '000';
        emp.RefName = 'Default';
        emp.ReferenceStatus = 'Default';
        emp.Guard_FullName = emp.Gaurd_FirstName;
        emp.LandMark = emp.Address2;
        emp.VillageorTown = emp.Place;
        emp.Designation = '';
        this.submittoAPI(emp);
      }

      // this.submittoAPI(emp);
    } else {
      this._swServ.showErrorMessage(
        'Invalid Form!!',
        'Please Check Provided Details.'
      );
    }
    //      setTimeout(function(){
    //     this.loaded=false   ;

    //  },2000);
  }
  onCancel() {
    //
    this.initForm();
  }
  submittoAPI(regemploy): void {
    if (this.fvalid) {
      this.api.registeremployee(regemploy).subscribe(
        (data: APIResult) => {
          //console.log(data);
          let status: Boolean = data.status;
          let m: string = data.message;
          if (status) {
            this.userTypes = data.usertypes;
            this.designatons = data.designations;
            this._swServ.showSuccessMessage('Success!!!', m);
            this.router.navigate(['/login']);
            emp = new Pdsemployee();
          } else {
            this._swServ.showErrorMessage('Error!!', m);
          }
        },
        err => {
          //console.log(err);
          this._swServ.showErrorMessage('Network Error!!!', err.message);
        }
      );
    } else {
      this._swServ.showErrorMessage(
        'Invalid Form!!',
        'Please Check Provided Details.'
      );
    }
  }
  validateallnonemptyfields() {
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.FirstName, 'fname');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.Phone, 'phone');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.EmpAge, 'age');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.Address1, 'ad1');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.Place, 'place');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.State, 'state');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.PostalCode, 'post');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.AAdharNumber, 'aad');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.PANNumber, 'pan');
    }
    // this.validateNonEmptyfilelds(emp.UserName,"usr") ;
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.LocationName, 'loc');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.Gaurd_PhoneNumber, 'gph');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.Gaurd_PhoneNumber, 'dist');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.Gaurd_PhoneNumber, 'enapb');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.VehicleNumber, 'veh');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.DLLRNumber, 'dllr');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.BankAccountNumber, 'acc');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.BankName, 'bank');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.BranchName, 'bb');
    }
    if (this.fvalid) {
      this.validateNonEmptyfilelds(emp.IFSCCode, 'ifsc');
    }
    // let  prom :Promise<boolean>= new Promise((resolve,reject)=>{
    //   if(this.fvalid){
    //     resolve(true);
    //   }else{
    //     reject(false);
    //   }
    // });
    // return prom;
  }
  validateNonEmptyfilelds(txt: any, field: string): void {
    const errorTitle: string = 'INVALID INPUT!!!';

    // let valid  = false;
    // var txt = event.target.value;
    if (field == 'fname') {
      var f = 'First Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'phone') {
      var f = 'Employee Contact Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'age') {
      var f = 'Employee AGE';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'ad1') {
      var f = 'Employee Address';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'place') {
      var f = 'Employee Place';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'state') {
      var f = 'Employee State';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'post') {
      var f = 'Employee PostalCode';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'aad') {
      var f = 'Employee AAdhar Code';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'pan') {
      var f = 'Employee PAN Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'usr') {
      var f = 'Employee User Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'loc') {
      var f = 'Employee Location Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'veh') {
      var f = 'Employee Vehicle Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'dllr') {
      var f = 'Employee Drving or Learning Liscense';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'gph') {
      var f = 'Employee Guardian Phone Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'dist') {
      var f = 'Employee District';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'enapb') {
      var f = 'Employee Name as per Bank';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'veh') {
      var f = 'Employee Vehicle Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'dllr') {
      var f = 'Employee Drving or Learning Liscense';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'acc') {
      var f = 'Employee Bank Account Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'bank') {
      var f = 'Employee Bank Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'ifsc') {
      var f = 'Employee Bank IFSC Code';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'bb') {
      var f = 'Employee Bank  Branch Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'g') {
      var f = 'Employee Location Name';
      // this.fvalid = true;
    } else if (field == 'empc') {
      var f = 'CDA Employee Code';
      //  this.showrequiredMessage(f, txt, errorTitle);
      // this.fvalid = true;
    }
  }
  focusOutFunction(field, event: any): void {
    const errorTitle: string = 'INVALID INPUT!!!';
    var txt = event.target.value;
    if (field == 'fname') {
      var f = 'First Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'email') {
      var f = 'Employee Email Address';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'phone') {
      var f = 'Employee Contact Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'age') {
      var f = 'Employee AGE';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'ad1') {
      var f = 'Employee Address';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'place') {
      var f = 'Employee Place';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'state') {
      var f = 'Employee State';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'post') {
      var f = 'Employee PostalCode';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'aad') {
      var f = 'Employee AAdhar Code';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'pan') {
      var f = 'Employee PAN Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'usr') {
      var f = 'Employee User Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'dist') {
      var f = 'Employee District';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'loc') {
      var f = 'Employee Location Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'gph') {
      var f = 'Employee Guardian Phone Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'enapb') {
      var f = 'Employee Name as per Bank';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'veh') {
      var f = 'Employee Vehicle Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'dllr') {
      var f = 'Employee Drving or Learning Liscense';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'acc') {
      var f = 'Employee Bank Account Number';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'bank') {
      var f = 'Employee Bank Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'ifsc') {
      var f = 'Employee Bank IFSC Code';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'bb') {
      var f = 'Employee Bank  Branch Name';
      this.showrequiredMessage(f, txt, errorTitle);
    } else if (field == 'g') {
      var f = 'Employee Location Name';
      //this.fvalid = true;
    }
  }
  showrequiredMessage(field, txt, title) {
    var test = false;
    if (
      (txt == '' || txt == null || txt == undefined) &&
      field !== 'Employee Guardian Phone Number'
    ) {
      var msg = field + ' ' + ' field required!!';
      this.fvalid = false;
      this._swServ.showErrorMessage(title, msg);
    } else if (field == 'Employee State') {
      var msg = field + ' ' + ' contains only alphabets!!';
      test = this.api.ValidateAlpha(txt);
      if (!test) {
        this.fvalid = false;
        this._swServ.showErrorMessage(title, msg);
      } else {
        this.fvalid = true;
      }
    } else if (
      field == 'Employee Contact Number' ||
      field == 'Employee AAdhar Code' ||
      field == 'Employee PostalCode' ||
      field == 'Employee AGE' ||
      field == 'Employee Guardian Phone Number'
    ) {
      var msg = field + ' ' + ' contains Only Numbers!!';
      if (
        field == 'Employee Guardian Phone Number' &&
        (txt == '' || txt == null || txt == undefined)
      ) {
        txt = '000';
      }
      test = this.ValidateNumbers(txt);
      if (!test) {
        this.fvalid = false;
        this._swServ.showErrorMessage(title, msg);
      } else {
        var index = txt.indexOf('+');
        var ind = txt.indexOf('-');
        if (
          field == 'Employee Contact Number' &&
          txt.length == 10 &&
          (index == -1 || ind == -1)
        ) {
          this.fvalid = true;
        } else if (field == 'Employee AGE') {
          this.fvalid = true;
        } else if (field == 'Employee PostalCode') {
          this.fvalid = true;
        } else if (field == 'Employee AAdhar Code') {
          this.fvalid = true;
        } else if (
          field == 'Employee Guardian Phone Number' &&
          txt.length == 10 &&
          (index == -1 || ind == -1)
        ) {
          this.fvalid = true;
        } else if (field == 'Employee Guardian Phone Number' && txt == '000') {
          this.fvalid = true;
        } else {
          if (index !== -1 || ind !== -1) {
            var msg =
              field +
              ' ' +
              ' field must contains only 10 digits, NO extension allowed!!';
            this.fvalid = false;
            this._swServ.showErrorMessage(title, msg);
          } else {
            var msg = field + ' ' + ' field must contains only 10 digits!!';
            this.fvalid = false;
            this._swServ.showErrorMessage(title, msg);
          }
        }
      }
    } else if (field == 'Employee Email Address') {
      var msg = field + ' ' + ' is not in proper Email Address format!!';
      test = this.ValidateEmail(txt);
      if (!test) {
        this.fvalid = false;
        this._swServ.showErrorMessage(title, msg);
      } else {
        this.fvalid = true;
      }
    } else if (
      field == 'Employee Type Status' ||
      field == 'Employee Marital Status'
    ) {
      this.fvalid = false;
      this._swServ.showErrorMessage(title, txt);
    } else if (field == 'Employee User Name') {
      var msg = field + ' ' + ' should not contain Only Numbers!!';
      test = this.ValidateNumbers(txt);
      if (test) {
        this.fvalid = false;
        this._swServ.showErrorMessage(title, msg);
      } else {
        this.api.checkUserName(txt).subscribe(
          (data: APIResult) => {
            //   console.log(data);
            let status: Boolean = data.status;
            let m: string = data.message;
            if (status) {
              this.fvalid = true;
              this._swServ.showSuccessMessage('Success!!!', m);
            } else {
              this.fvalid = false;
              this._swServ.showErrorMessage('Error!!', m);
            }
          },
          err => {
            this.fvalid = false;
            this._swServ.showErrorMessage('Network Error!!!', err.message);
          }
        );
      }
    } else {
      this.fvalid = true;
    }
  }
  ValidateEmail(inputText): boolean {
    var val = false;
    var reg = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    val = reg.test(inputText);
    return val;
    // if (inputText.value.match(mailformat)) {
    //   alert("Valid email address!");
    //   document.form1.text1.focus();
    //   return true;
    // } else {
    //   alert("You have entered an invalid email address!");
    //   document.form1.text1.focus();
    //   return false;
    // }
  }

  ValidateNumbers(txt: string): boolean {
    var val = false;
    var regexp = new RegExp('^[0-9]+$');
    val = regexp.test(txt);
    return val;
  }
  checkValue(event: any, field) {
    // console.log(event.checked);
    // console.log(event.source.value);
    console.log(event);
    const errorTitle: string = 'INVALID INPUT!!!';
    if (field == 'm') {
      var f = 'Employee Marital Status';
      let v = event.source.value;
      if (!event.checked) {
        var txt = '';

        if (
          emp.Marital != null &&
          emp.Marital != '' &&
          emp.Marital != undefined
        ) {
          if (this.checkMarried) {
            emp.MaritalStatus = true;
            emp.Marital = 'married';
          } else if (this.checkUnMarried) {
            emp.MaritalStatus = false;
            emp.Marital = 'unmarried';
          }
        }
        if (v == 'married') {
          this.checkMarried = false;
        }
        if (v == 'unmarried') {
          this.checkUnMarried = false;
        }
        if (this.checkMarried == false && this.checkUnMarried == false) {
          emp.Marital = '';
          this.fvalid = false;
          this.showrequiredMessage(f, '', errorTitle);
        }
      } else {
        emp.Marital = v;
        if (v == 'married') {
          this.checkMarried = true;
          // this.checkUnMarried = true;
          emp.MaritalStatus = true;
        } else if (v == 'unmarried') {
          this.checkUnMarried = true;
          emp.MaritalStatus = false;
        }
        if (this.checkMarried == true && this.checkUnMarried == true) {
          //emp.Marital ="";
          this.fvalid = false;
          this.showrequiredMessage(f, '', errorTitle);
        }
      }
    } else if (field == 'e') {
      let v = event.source.value;
      var f = 'Employee Type Status';
      if (!event.checked) {
        var txt = '';

        if (
          emp.Employeetype != null &&
          emp.Employeetype != '' &&
          emp.Employeetype != undefined
        ) {
          if (this.checkPermanent) {
            emp.IsPermanent = true;
            emp.Employeetype = 'permanent';
          } else if (this.checkContract) {
            emp.IsPermanent = false;
            emp.Employeetype = 'contract';
          }
        }
        if (v == 'permanent') {
          this.checkPermanent = false;
        }
        if (v == 'contract') {
          this.checkContract = false;
        }
        if (this.checkPermanent == false && this.checkContract == false) {
          emp.Employeetype = '';
          this.fvalid = false;
          this.showrequiredMessage(f, '', errorTitle);
        }
      } else {
        emp.Employeetype = v;
        if (v == 'permanent') {
          this.checkPermanent = true;
          emp.IsPermanent = true;
        } else if (v == 'contract') {
          this.checkContract = true;
          emp.IsPermanent = false;
        }
        if (this.checkPermanent == true && this.checkContract == true) {
          //emp.Employeetype = "";
          this.fvalid = false;
          this.showrequiredMessage(f, '', errorTitle);
        }
      }
    }
  }
}
