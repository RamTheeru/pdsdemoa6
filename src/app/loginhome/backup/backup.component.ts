import { Component, OnInit } from "@angular/core";
import { SweetService } from "../../sweet.service";
import { ViewService } from "../../view.service";
import { PdsApiService } from "../../pds-api.service";
import { APIResult } from "../../models/apiresult";
import { DbBackupInfo } from "../../models/dbbackupinfo";
import { Subscription } from "rxjs";
@Component({
  selector: "app-backup",
  templateUrl: "./backup.component.html",
  styleUrls: ["./backup.component.css"]
})
export class BackupComponent implements OnInit {
  backups: DbBackupInfo[] = [];
  tkn: string = "";
  private subsc: Subscription;
  constructor(
    private api: PdsApiService,
    private vServ: ViewService,
    private _swServ: SweetService
  ) {}

  ngOnInit() {
    this.subsc = this.vServ.utoken.subscribe((val: string) => {
      this.tkn = val;
    });
    if (this.tkn == null || this.tkn == undefined || this.tkn == "") {
      this.tkn = this.vServ.getToken();
    }
    this.api.getBackups(this.tkn).subscribe(
      (data: APIResult) => {
        console.log(data);
        let status: Boolean = data.status;
        let m: string = data.message;
        if (status) {
          this.backups = data.dbBackups;
        } else {
          this._swServ.showErrorMessage("Error!!", m);
        }
        if (this.backups.length > 0) {
          this.backups.forEach(el => {
            el.fileName = el.fileName.replace(".sql", "");
          });
        }
      },
      err => {
        //console.log(err.message);
        this._swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );
  }
  restore(evnt, val) {
    // var nam = evnt.target.id;
    // console.log(nam);
    //console.log(val);
    var nam = val.filePath;
    console.log(nam);
    if (nam !== "" || nam !== undefined || nam !== null) {
      this.api.restore(nam, this.tkn).subscribe(
        (data: APIResult) => {
          console.log(data);
          let status: Boolean = data.status;
          let m: string = data.message;
          if (status) {
            this._swServ.showSuccessMessage("Sucess!!", m);
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
        "Error!!",
        "unable to restore, misssing file path"
      );
    }
  }
}
