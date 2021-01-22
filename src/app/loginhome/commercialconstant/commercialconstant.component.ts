import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { SweetService } from "../../sweet.service";
import { ViewService } from "../../view.service";
import { PdsApiService } from "../../pds-api.service";
import { APIResult } from "../../models/apiresult";
import { Station } from "../../models/station";
import { CommercialConstant } from "../../models/commercialconstant";
import { Subscription } from "rxjs";
const cc: CommercialConstant = new CommercialConstant();
@Component({
  selector: "app-commercialconstant",
  templateUrl: "./commercialconstant.component.html",
  styleUrls: ["./commercialconstant.component.css"]
})
export class CommercialconstantComponent implements OnInit, OnDestroy {
  ccForm: FormGroup;
  stations: Station[];
  tkn: string = "";
  private subsc: Subscription;
  constructor(
    private _fb: FormBuilder,
    private api: PdsApiService,
    private vServ: ViewService,
    private _swServ: SweetService
  ) {}
  apiResult: APIResult;

  ngOnInit() {
    this.subsc = this.vServ.utoken.subscribe((val: string) => {
      this.tkn = val;
    });
    if (this.tkn == null || this.tkn == undefined || this.tkn == "") {
      this.tkn = this.vServ.getToken();
    }
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
  handleUnauthorizedrequest() {
    this._swServ.showErrorMessage(
      "Invalid Request!!!",
      "Unable to process request with invalid token, Please login again!!!"
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
  ngOnDestroy() {
    this.subsc.unsubscribe();
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
      this.api.createconstant(cc, thtkn).subscribe(
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
