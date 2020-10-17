import { Component, OnInit } from "@angular/core";
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
  editMode: Boolean = false;
  formText: string = "Enter Voucher Details:";
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
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
