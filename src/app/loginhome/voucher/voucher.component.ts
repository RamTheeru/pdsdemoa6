import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-voucher",
  templateUrl: "./voucher.component.html",
  styleUrls: ["./voucher.component.css"]
})
export class VoucherComponent implements OnInit {
  voucherForm: FormGroup;
  voucherId: number = 0;
  editMode: Boolean = false;
  formText: string = "Enter Voucher Details:";
  constructor(private _fb: FormBuilder, private route: ActivatedRoute) {}

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
      this.initForm();
    });
    this.initForm();
    if (this.editMode) {
      this.formText = "Edit Voucher Details:";
    } else {
      this.formText = "Enter Voucher Details:";
    }
  }
  initForm() {
    if (this.editMode) {
      let eDate = new FormControl(new Date("09/15/2020"));
      this.voucherForm = this._fb.group({
        location: new FormControl("Guntakal"),
        voucherdate: eDate,
        vno: new FormControl("3352365263"),
        paidto: new FormControl("Gtk"),
        purpose: new FormControl("Transport"),
        netamnt: new FormControl("1000"),
        tax: new FormControl("gst")
      });
    } else {
      this.voucherForm = this._fb.group({
        location: new FormControl(""),
        voucherdate: new FormControl(),
        vno: new FormControl(),
        paidto: new FormControl(),
        purpose: new FormControl(),
        netamnt: new FormControl(),
        tax: new FormControl("")
      });
    }
  }
  onSubmit() {}
}
