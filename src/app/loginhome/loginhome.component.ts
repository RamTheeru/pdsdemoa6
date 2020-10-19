import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatSidenav } from "@angular/material";
import * as r from "rxjs";
import { ViewService } from "../view.service";
@Component({
  selector: "app-loginhome",
  templateUrl: "./loginhome.component.html",
  styleUrls: ["./loginhome.component.css"]
})
export class LoginhomeComponent implements OnInit, OnDestroy {
  @Input("") user: string;
  private subsc: r.Subscription;
  loginInfo: string = "";
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
    //this.user = "fle";
    if (this.user === "admin") {
      this.userType = 1;
    } else if (this.user === "financele") {
      this.userType = 2;
      this.shownotify = false;
      this.loginInfo = "Finance LE Login";
    } else if (this.user === "financeme") {
      this.userType = 3;
      this.shownotify = false;
      this.loginInfo = "Finance ME Login";
    } else {
    }
  }
  Onbtnclick() {
    this.shoesidenav = !this.shoesidenav;
  }
  oncreateclk(tab = "") {
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
    } else if (tab == "fhe") {
      this.shownotify = false;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.setVerify("fhe");
      this.router.navigate["/loginhome/viewledger"];
    } else {
      this.shownotify = true;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
      this.vServ.removeValue("fheverify");
    }
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  onLogout() {
    this.vServ.removeValue("storedProp");
  }
}
