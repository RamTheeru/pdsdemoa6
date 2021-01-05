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
@Component({
  selector: "app-approveemployee",
  templateUrl: "./approveemployee.component.html",
  styleUrls: ["./approveemployee.component.css"]
})
export class ApproveemployeeComponent implements OnInit {
  registerId: number = 0;
  aprvForm: FormGroup;
  professions: Profession[];
  empCode: string;
  profid: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private api: PdsApiService,
    private _swServ: SweetService,
    private matDialog: MatDialog
  ) {
    this.registerId = data.registerId;
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
            console.log(this.professions);
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
    console.log(this.registerId, this.empCode, p);
    if (
      this.registerId == 0 ||
      p == 0 ||
      p == undefined ||
      this.empCode == "" ||
      this.empCode == undefined ||
      this.empCode == null
    ) {
      this._swServ.showErrorMessage("Error!!", "Invalid Input!!!");
    } else {
      let pid = Number(p);
      // this.api.approveUser(this.registerId, "a", pid, empCode).subscribe(
      //   (data: APIResult) => {
      //     //
      //     //     console.log(data)     ;
      //     let status: Boolean = data.status;
      //     let m: string = data.message;
      //     if (status) {
      //       this.professions = data.professions;
      //     } else {
      //       this._swServ.showErrorMessage("Error!!", m);
      //     }
      //     this.initForm();
      //     // let dialogRef = this.matDialog.open(ApproveemployeeComponent);
      //     //dialogRef.close();
      //   },
      //   err => {
      //     //console.log(err.message);
      //     this._swServ.showErrorMessage("Network Error!!!", err.message);
      //   }
      // );
      const config2 = new MatDialogConfig();
      config2.disableClose = true;
      config2.autoFocus = true;
      config2.width = "60%";
      config2.closeOnNavigation = true;
      config2.data = {
        registerId: this.registerId
      };
      let dialogRef = this.matDialog.open(ApproveemployeeComponent, config2);
      dialogRef.close();
    }
  }
}
