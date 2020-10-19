import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Ledger } from "../../models/ledger";
import * as r from "rxjs";
import { ViewService } from "../../view.service";
@Component({
  selector: "app-viewledger",
  templateUrl: "./viewledger.component.html",
  styleUrls: ["./viewledger.component.css"]
})
export class ViewledgerComponent implements OnInit, OnDestroy {
  @Input("") userType: string;
  private subsc: r.Subscription;
  isLe: Boolean = false;
  isHe: Boolean = false;
  fromDate: string = "";
  toDate: string = "";
  location: string = "";
  list: Ledger[] = [
    {
      Id: 1,
      VoucherDate: "09-04-2021",
      VoucherNumber: "PDS/2021/GTKl/10/001",
      Particulars: "Petty Cash to Station-ops",
      Credit: "XXX",
      Debit: "XXX",
      Balance: "10000",
      Status: "A"
    },
    {
      Id: 2,
      VoucherDate: "09-09-2021",
      VoucherNumber: "PDS/2021/GTKl/10/002",
      Particulars: "Petty Cash to Station-ops",
      Credit: "XXX",
      Debit: "XXX",
      Balance: "9000",
      Status: "A"
    },
    {
      Id: 3,
      VoucherDate: "09-18-2021",
      VoucherNumber: "PDS/2021/GTKl/10/003",
      Particulars: "Petty Cash to Station-ops",
      Credit: "XXX",
      Debit: "XXX",
      Balance: "12000",
      Status: "R"
    }
  ];
  constructor(private vServ: ViewService) {}

  ngOnInit() {
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.userType = val;
    });
    var index = this.userType.indexOf("le");
    if (index !== -1) {
      this.isLe = true;
    } else {
      this.isHe = true;
    }
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  getlist(event) {}
}
