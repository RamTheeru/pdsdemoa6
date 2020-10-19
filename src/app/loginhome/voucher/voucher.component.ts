import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import * as r from "rxjs";
import { ViewService } from "../../view.service";
@Component({
  selector: "app-voucher",
  templateUrl: "./voucher.component.html",
  styleUrls: ["./voucher.component.css"]
})
export class VoucherComponent implements OnInit {
  userType: string;
  private subsc: r.Subscription;
  isLe: Boolean = false;
  isHe: Boolean = false;
  voucherForm: FormGroup;
  voucherId: number = 0;
  editMode: Boolean = false;
  formText: string = "Enter Voucher Details:";
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private vServ: ViewService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.voucherId = +params["id"];
      // let vw = this.route.url["_value"];
      // let str = vw[0].path;
      // let index = str.indexOf("individual");
      // console.log(index);
      // if(index!=="-1")
      // {
      //   this.showbtns = true;
      // }
      // else{
      //   this.showbtns = false;
      // }
      this.editMode = params["id"] != null;
      this.subsc = this.vServ.data.subscribe((val: string) => {
        this.userType = val;
      });

      this.initForm();
    });
    this.initForm();
    if (this.editMode) {
      var index = this.userType.indexOf("le");
      if (index !== -1) {
        this.isLe = true;
      } else {
        this.isHe = true;
      }
      this.formText = "Edit Voucher Details:";
    } else {
      this.formText = "Enter Voucher Details:";
    }
  }
  initForm() {
    if (this.editMode) {
      let eDate = new FormControl(new Date("09/15/2020"));
      this.voucherForm = this._fb.group({
        location: new FormControl("gtk"),
        voucherdate: eDate,
        vno: new FormControl("PDS/2021/GTKl/10/001"),
        paidto: new FormControl("Gtk"),
        purpose: new FormControl("Transport"),
        netamnt: new FormControl("1000"),
        tax: new FormControl("gst"),
        totalamnt: new FormControl("10000")
      });
    } else {
      this.voucherForm = this._fb.group({
        location: new FormControl(""),
        voucherdate: new FormControl(),
        vno: new FormControl(),
        paidto: new FormControl(),
        purpose: new FormControl(),
        netamnt: new FormControl(),
        tax: new FormControl(""),
        totalamnt: new FormControl(),
        remark: new FormControl()
      });
    }
  }
  onSubmit() {}
}
