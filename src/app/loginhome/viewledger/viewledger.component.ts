import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  OnDestroy
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ledger } from "../../models/ledger";
import * as r from "rxjs";
import { ViewService } from "../../view.service";
@Component({
  selector: "app-viewledger",
  templateUrl: "./viewledger.component.html",
  styleUrls: ["./viewledger.component.css"]
})
export class ViewledgerComponent implements OnInit, OnChanges, OnDestroy {
  @Input("") userType: string;
  @ViewChild("tablist") tablist: ElementRef;
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  isLe: Boolean = false;
  isHe: Boolean = false;
  @Input("") fheVerify: string = "";
  isVerify: Boolean = false;
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
      Status: "A",
      VStatus: false
    },
    {
      Id: 2,
      VoucherDate: "09-09-2021",
      VoucherNumber: "PDS/2021/GTKl/10/002",
      Particulars: "Petty Cash to Station-ops",
      Credit: "XXX",
      Debit: "XXX",
      Balance: "9000",
      Status: "A",
      VStatus: false
    },
    {
      Id: 3,
      VoucherDate: "09-18-2021",
      VoucherNumber: "PDS/2021/GTKl/10/003",
      Particulars: "Petty Cash to Station-ops",
      Credit: "XXX",
      Debit: "XXX",
      Balance: "12000",
      Status: "R",
      VStatus: false
    }
  ];
  constructor(private vServ: ViewService, private route: ActivatedRoute) {
    // console.log(this.route.snapshot["_routerState"].url);
    //this.ngOnInit();
    // this.route.params.subscribe(params => {
    //   console.log(params);
    // });
  }

  ngOnInit() {
    this.list.forEach(obj => {
      obj.VStatus = obj.Status == "A" ? true : false;
    });
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.userType = val;
    });

    this.subsc2 = this.vServ.verify.subscribe((val: string) => {
      this.fheVerify = val;
    });

    var index = this.userType.indexOf("le");
    if (index !== -1) {
      this.isLe = true;
      this.isVerify = false;
    } else {
      this.isHe = true;
      if (this.fheVerify == "fhe") {
        this.isVerify = true;
      } else {
        this.isVerify = false;
      }
    }
  }
  ngOnChanges() {
    console.log("page reloading");
    this.ngOnInit();
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
  }
  onAccept() {
    let child = [];
    child = this.tablist.nativeElement.children;
    let cc = [];
    cc = child[0].children[1].childNodes;
    for (var val of cc) {
      console.log(val);
    }
  }
  onReject() {}
  onDownload() {}
  getlist(event) {}
}
