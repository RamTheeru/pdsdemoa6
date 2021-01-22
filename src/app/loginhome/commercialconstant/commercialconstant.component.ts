import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { SweetService } from "../../sweet.service";
import { PdsApiService } from "../../pds-api.service";
import { APIResult } from "../../models/apiresult";
import { Station } from "../../models/station";
import { CommercialConstant } from "../../models/commercialconstant";
const cc: CommercialConstant = new CommercialConstant();
@Component({
  selector: "app-commercialconstant",
  templateUrl: "./commercialconstant.component.html",
  styleUrls: ["./commercialconstant.component.css"]
})
export class CommercialconstantComponent implements OnInit {
  ccForm: FormGroup;
  stations: Station[];
  constructor(
    private _fb: FormBuilder,
    private api: PdsApiService,
    private _swServ: SweetService
  ) {}
  apiResult: APIResult;

  ngOnInit() {
    this.initForm();
    this.api.getConstants().subscribe(
      (data: APIResult) => {
        //console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
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
  }
  initForm() {
    this.ccForm = this._fb.group({
      station: new FormControl(""),
      delv: new FormControl(""),
      petr: new FormControl(""),
      inc: new FormControl("")
    });
  }
  onSubmit() {
    let st = this.ccForm.value["station"];
    cc.stationId = st.stationId;
    cc.deliveryRate = this.ccForm.value["delv"];
    cc.petrolAllowance = this.ccForm.value["petr"];
    cc.incentives = this.ccForm.value["inc"];
    if (
      cc.stationId == 0 ||
      cc.stationId == undefined ||
      cc.stationId == null
    ) {
      this._swServ.showErrorMessage("Invalid Input!!", "Please Select Station");
    } else if (
      cc.deliveryRate == 0 ||
      cc.deliveryRate == undefined ||
      cc.deliveryRate == null
    ) {
      this._swServ.showErrorMessage(
        "Invalid Input!!",
        "Please Enter Delivery Rate"
      );
    } else if (
      cc.petrolAllowance == 0 ||
      cc.petrolAllowance == undefined ||
      cc.petrolAllowance == null
    ) {
      this._swServ.showErrorMessage(
        "Invalid Input!!",
        "Please Enter PetrolAllowance Rate"
      );
    } else {
      //submit to API
      this.api.createconstant(cc, tkn).subscribe(
        (data: APIResult) => {
          //console.log(data);
          let status: Boolean = data.status;
          let m: string = data.message;
          if (status) {
            this._swServ.showSuccessMessage("Success!!!", m);
            this.initForm();
            // this.ngAfterViewInit();
          } else {
            this._swServ.showErrorMessage("Error!!", m);
          }
        },
        err => {
          //console.log(err);
          this._swServ.showErrorMessage("Network Error!!!", err.message);
        }
      );
    }
  }
}
