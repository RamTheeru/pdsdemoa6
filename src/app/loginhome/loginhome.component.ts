import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { MatSidenav } from "@angular/material";
import * as r from "rxjs";
import { ViewledgerComponent } from "./viewledger/viewledger.component";
import { ViewService } from "../view.service";
import { UserType } from "../models/usertype";
// const navigationExtras: NavigationExtras = {
//   state: {
//     transd: 'TRANS001',
//     workQueue: false,
//     services: 10,
//     code: '003'
//   }
// };
@Component({
  selector: "app-loginhome",
  templateUrl: "./loginhome.component.html",
  styleUrls: ["./loginhome.component.css"]
})
export class LoginhomeComponent implements OnInit, OnDestroy {
  @Input("") user: string;
  private subsc: r.Subscription;
  private subsc2: r.Subscription;
  userInfo: UserType = new UserType();
  loginInfo: string = "";
  loginUsername: string = "";
  userType: number = 0;
  isFle: Boolean = false;
  shoesidenav: Boolean = false;
  shownotify: Boolean = true;
  actTab: Boolean = false;
  @ViewChild("sidenav") sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  act1SubMenu: boolean = false;
  act2SubMenu: boolean = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(private vServ: ViewService, private router: Router) {}

  ngOnInit() {
    this.subsc = this.vServ.data.subscribe((val: string) => {
      this.user = val;
    });
    this.subsc2 = this.vServ.userInfo.subscribe((res: UserType) => {
      this.userInfo = res;
    });
    this.loginUsername = this.userInfo.user;
    //this.user = "fle"
    if (this.user === "admin") {
      this.userType = 1;
    } else if (this.user === "financele") {
      this.userType = 2;
      this.shownotify = false;
      this.loginInfo = "Finance LE Login";
    } else if (this.user === "financehe") {
      this.userType = 3;
      this.shownotify = false;
      this.loginInfo = "Finance HE Login";
    } else if (this.user === "executivele") {
      this.userType = 4;
      this.shownotify = false;
      this.loginInfo = "Executive LE Login";
    } else if (this.user === "executivehe") {
      this.userType = 5;
      this.shownotify = false;
      this.loginInfo = "Executive HE Login";
    } else if (this.user === "hrle") {
      this.userType = 6;
      this.shownotify = false;
      this.loginInfo = "HR LE Login";
    } else if (this.user === "hrhe") {
      this.userType = 7;
      this.shownotify = false;
      this.loginInfo = "HR HE Login";
    } else {
      //
    }
  }
  Onbtnclick() {
    this.shoesidenav = !this.shoesidenav;
  }
  oncreateclk(tab = "") {
    //fdhfgjf
    this.shownotify = false;
    if (tab == "si") {
      this.act1SubMenu = true;
      this.act2SubMenu = false;
    } else if (tab == "sl") {
      this.act1SubMenu = false;
      this.act2SubMenu = true;
    } else {
      this.act1SubMenu = false;
      this.act2SubMenu = false;
    }
  }
  onloghomeclk(tab = "") {
    if (tab == "fh") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      // this.router.navigate["/loginhome"];
    } else if (tab == "fhe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      this.vServ.setVerify("fhe");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/verifyvouchers"]);
    } else if (tab == "fihe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/viewledger"]);
    } else if (tab == "fle") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("hrvheverify");
    } else if (tab == "ele") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("hrvheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("fheverify");
    } else if (tab == "ehe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("hrvheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("fheverify");
    } else if (tab == "eele") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("hrvheverify");
      this.router.navigate(["/loginhome/createemployee"]);
    } else if (tab == "edle") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("hrvheverify");
      this.vServ.setVerify("edle");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/createdeliveryassociate"]);
    } else if (tab == "evhe") {
      // this.shownotify = false;
      // this.act1SubMenu = false;
      // this.act2SubMenu = false;
      // this.vServ.removeValue("edleverify");
      // this.vServ.removeValue("fheverify");
      // this.vServ.setVerify("evhe");
      // this.router.onSameUrlNavigation = "reload";
      // this.router.navigate(["/loginhome/employees"]);
    } else if (tab == "eehe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/viewdas"]);
    } else if (tab == "hrle") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/createemployee"]);
    } else if (tab == "hrhe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("hrvheverify");
      this.vServ.removeValue("fheverify");
      //this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.setVerify("evhe");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/confirmemployment"]);
    } else if (tab == "hruahe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      //this.vServ.setVerify("hruahe");
      //this.router.onSameUrlNavigation = "reload";
      //this.router.navigate(["/loginhome/employees"]);
    } else if (tab == "hrvhe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.setVerify("hrvhe");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/viewemployees"]);
    } else if (tab == "hrgshe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/loginhome/generatesalaryslips"]);
    } else {
      this.shownotify = true;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
      this.vServ.removeValue("evheverify");
      this.vServ.removeValue("edleverify");
      this.vServ.removeValue("hrvheverify");
      //sfc  gds
    }
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
  }
  onLogout() {
    this.vServ.removeValue("storedProp");
    this.vServ.removeValue("fheverify");
    this.vServ.removeValue("edleverify");
    this.vServ.removeValue("evheverify");
    this.vServ.removeValue("hrvheverify");
    //
  }
}
