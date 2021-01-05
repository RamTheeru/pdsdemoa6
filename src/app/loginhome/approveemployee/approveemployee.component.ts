import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
import { Profession } from "../../models/profession";
import { APIResult } from "../../models/apiresult";
import { ApiInput } from "../../models/apiinput";
@Component({
  selector: "app-approveemployee",
  templateUrl: "./approveemployee.component.html",
  styleUrls: ["./approveemployee.component.css"]
})
export class ApproveemployeeComponent implements OnInit {
  registerId: number = 0;
  stationId: number = 0;
  apiInput: ApiInput;
  aprvForm: FormGroup;
  usrToken: string = "";
  professions: Profession[];
  empCode: string;
  profid: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private api: PdsApiService,
    private _swServ: SweetService,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<ApproveemployeeComponent>
  ) {
    this.registerId = data.registerId;
    this.stationId = data.stationId;
    this.usrToken = data.token;
  }

  ngOnInit() {
    if (this.registerId > 0) {
      this.api.getConstants().subscribe(
        (data: APIResult) => {
          // ,jbgkgg
          //console.log(data);
          let status: Boolean = data.status;
          let m: string = data.message;
          if (status) {
            // this.userTypes = data.usertypes;
            // this.designatons = data.designations;
            this.professions = data.professions;
            // console.log(this.professions);
            // this.stations = data.stations;
            // this._swServ.showSuccessMessage("Success!!", m);
          } else {
            this._swServ.showErrorMessage("Error!!", m);
          }
        },
        err => {
          //console.log(err.message);
          this._swServ.showErrorMessage("Network Error!!!", err.message);
        }
      );
    } else {
      this._swServ.showErrorMessage(
        "Error!!!",
        "Please close it and try again!!!!"
      );
    }
  }
  onClose() {
    this.initForm();
    this.dialogRef.close();
  }
  initForm() {
    // this.aprvForm = this._fb.group({
    //   prof: new FormControl(""),
    //   empc: new FormControl()
    // });
    // this.aprvForm = new FormGroup({
    //   prof: new FormControl(""),
    //   empc: new FormControl()
    // });
    //
    this.profid = 0;
    this.empCode = "";
  }
  onCancel() {
    this.initForm();
    // let dialogRef = this.matDialog.open(ApproveemployeeComponent);
    // dialogRef.close();
  }
  onSubmit() {
    // var p = this.aprvForm.value["prof"];
    // let empCode = this.aprvForm.value["empc"];
    let p = this.profid;
    //console.log(this.registerId, this.empCode, p);
    if (
      this.registerId == 0 ||
      p == 0 ||
      p == undefined ||
      this.empCode == "" ||
      this.empCode == undefined ||
      this.empCode == null ||
      this.usrToken == "" ||
      this.stationId == 0
    ) {
      this._swServ.showErrorMessage("Error!!", "Invalid Input!!!");
    } else {
      let pid = Number(p);
      this.api.approveUser(this.registerId, "a", pid, this.empCode).subscribe(
        (data: APIResult) => {
          //
          //     console.log(data)     ;
          let status: Boolean = data.status;
          let m: string = data.message;
          if (status) {
            this._swServ.showSuccessMessage("Success!!", m);
            //   this.professions = data.professions;
            this.apiInput = new ApiInput();
            this.apiInput.stationId = Number(this.stationId);
            this.api.getRegisteredEmployees(this.apiInput, this.usrToken);
          } else {
            this._swServ.showErrorMessage("Error!!", m);
          }

          // let dialogRef = this.matDialog.open(ApproveemployeeComponent);
          //dialogRef.close();
        },
        err => {
          //console.log(err.message);
          this._swServ.showErrorMessage("Network Error!!!", err.message);
        }
      );
      this.initForm();
      this.dialogRef.close();
    }
  }
}
