import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-entercreditdetails",
  templateUrl: "./entercreditdetails.component.html",
  styleUrls: ["./entercreditdetails.component.css"]
})
export class EntercreditdetailsComponent implements OnInit {
  creditForm: FormGroup;
  editMode: Boolean = false;
  formText: string = "Enter Credit Details:";
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    if (this.editMode) {
      this.formText = "Edit Credit Details:";
    } else {
      this.formText = "Enter Credit Details:";
    }
  }
  initForm() {
    if (this.editMode) {
      this.creditForm = this._fb.group({
        lmcredit: new FormControl("4500"),
        lmtdebit: new FormControl("3200"),
        balance: new FormControl("300"),
        tmcredit: new FormControl("1000")
      });
    } else {
      this.creditForm = this._fb.group({
        lmcredit: new FormControl(),
        lmtdebit: new FormControl(),
        balance: new FormControl(),
        tmcredit: new FormControl()
      });
    }
  }
  onSubmit() {}
}
