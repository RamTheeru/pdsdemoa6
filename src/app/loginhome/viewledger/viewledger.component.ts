import { Component, OnInit } from "@angular/core";
import { Ledger } from "../../models/ledger";
@Component({
  selector: "app-viewledger",
  templateUrl: "./viewledger.component.html",
  styleUrls: ["./viewledger.component.css"]
})
export class ViewledgerComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
  getlist(event) {}
}
