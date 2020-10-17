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
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    if (this.editMode) {
      this.creditForm = this._fb.group({
        lmcredit: new FormControl(),
        lmtdebit: new FormControl(),
        balance: new FormControl(),
        tmcredit: new FormControl()
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
