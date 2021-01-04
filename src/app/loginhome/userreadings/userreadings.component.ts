import { Component, OnInit } from "@angular/core";
import { PdsApiService } from "../../pds-api.service";
import { SweetService } from "../../sweet.service";
import { APIResult } from "../../models/apiresult";
import { RequestDetail } from "../../models/requestdetail";
import { Environment } from "../../environment";
@Component({
  selector: "app-userreadings",
  templateUrl: "./userreadings.component.html",
  styleUrls: ["./userreadings.component.css"]
})
export class UserreadingsComponent implements OnInit {
  blck1Text: string = "";
  blck2Text: string = "";
  blck3Text: string = "";
  registeredUsersCount: number = 0;
  detailrequests: RequestDetail[];
  constructor(private api: PdsApiService, private _swServ: SweetService) {}

  ngOnInit() {
    this.blck1Text = Environment.Block1Text;
    this.blck2Text = Environment.Block2Text;
    this.blck3Text = Environment.Block3Text;
    this.api.getConstants().subscribe(
      (data: APIResult) => {
        //console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
          this.detailrequests = data.requests;
        } else {
          this._swServ.showErrorMessage("Error!!", m);
        }
      },
      err => {
        //console.log(err.message);
        this._swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );
    for (var index in this.detailrequests) {
      console.log(index); // prints indexes: 0, 1, 2, 3
    }
  }
}
