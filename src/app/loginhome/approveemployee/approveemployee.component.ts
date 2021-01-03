import { Component, OnInit } from "@angular/core";
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private api: PdsApiService,
    private _swServ: SweetService
  ) {
    this.registerId = data.registerId;
  }

  ngOnInit() {
    this.api.getConstants().subscribe(
      (data: APIResult) => {
        //console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
          // this.userTypes = data.usertypes;
          // this.designatons = data.designations;
          // this.stations = data.stations;
          this._swServ.showSuccessMessage("Success!!", m);
        } else {
          this._swServ.showErrorMessage("Error!!", m);
        }
      },
      err => {
        //console.log(err.message);
        this._swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );
  }
  initForm() {
    this.aprvForm = this._fb.group({
      prof: new FormControl(""),
      empc: new FormControl()
    });
  }
  onSubmit() {
    var p = this.aprvForm.value["prof"];
    let empCode = this.aprvForm.value["empc"];

    if (
      this.registerId == 0 ||
      p == "" ||
      p == undefined ||
      empCode == "" ||
      empCode == undefined ||
      empCode == null
    ) {
      this._swServ.showErrorMessage("Error!!", "Invalid Input!!!");
    } else {
      let pid = Number(p);
      this.api.approveUser(this.registerId, "a", pid, empCode).subscribe(
        (data: APIResult) => {
          //
          //     console.log(data)     ;
          let status: Boolean = data.status;
          let m: string = data.message;
          if (status) {
            this.professions = data.professions;
          } else {
            this._swServ.showErrorMessage("Error!!", m);
          }
          this.initForm();
        },
        err => {
          //console.log(err.message);
          this._swServ.showErrorMessage("Network Error!!!", err.message);
        }
      );
    }
  }
}
