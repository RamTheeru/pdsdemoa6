import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";
@Component({
  selector: "app-loginhome",
  templateUrl: "./loginhome.component.html",
  styleUrls: ["./loginhome.component.css"]
})
export class LoginhomeComponent implements OnInit {
  @Input("") user: string;
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
  constructor() {}

  ngOnInit() {
    this.user = "fle";
    if (this.user === "admin") {
      this.userType = 1;
    } else if (this.user === "fle") {
      this.userType = 2;
      this.shownotify = false;
      this.loginInfo = "Finance LE Login";
    } else if (this.user === "fme") {
      this.userType = 3;
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
    } else {
      this.shownotify = true;
      this.act1SubMenu = false;
      this.act2SubMenu = false;
    }
  }
}
