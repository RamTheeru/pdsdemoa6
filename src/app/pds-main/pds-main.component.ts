import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Environment } from "../environment";
import { UserType } from "../models/usertype";
import { PdsApiService } from "../pds-api.service";
import { AuthService } from "../auth.service";
import { ViewService } from "../view.service";
import { SweetService } from "../sweet.service";
@Component({
  selector: "app-pds-main",
  templateUrl: "./pds-main.component.html",
  styleUrls: ["./pds-main.component.css"]
})
export class PdsMainComponent implements OnInit {
  img: string;
  userName: string;
  password: string;
  user: UserType;
  view: Boolean = true;
  constructor(
    private router: Router,
    private vServ: ViewService,
    private sweet: SweetService,
    private api: PdsApiService,
    private autServ: AuthService
  ) {}

  ngOnInit() {
    //
    this.img = Environment.MainLogo;
  }
  onLogin() {
    this.user = this.autServ.signInuser(this.userName, this.password);
    if (this.user != null && this.user != undefined) {
      if (this.user.token != "" && this.user.userTypeId > 0) {
        let userInfo = this.user.role;
        let userTypeId = this.user.userTypeId;
        if (userTypeId == 1) {
        } else if (userTypeId == 2) {
          
        }
      } else {
        this.sweet.showErrorMessage(
          "Failed!!",
          "Login failed, Please try again."
        );
        // this.router.navigate(["/login"]);
      }
    } else {
      this.sweet.showErrorMessage("Failed!!", "Ivalid Login");
    }
    // if (this.user == "financele" && this.password == "1234") {
    //   this.vServ.setValue(this.user);
    //   this.router.navigate(["/loginhome"]);
    // } else if (this.user == "financehe" && this.password == "1234") {
    //   this.vServ.setValue(this.user);
    //   this.router.navigate(["/loginhome"]);
    // } else if (this.user == "executivele" && this.password == "1234") {
    //   this.vServ.setValue(this.user);
    //   this.router.navigate(["/loginhome"]);
    // } else if (this.user == "executivehe" && this.password == "1234") {
    //   this.vServ.setValue(this.user);
    //   this.router.navigate(["/loginhome"]);
    // } else if (this.user == "hrle" && this.password == "1234") {
    //   this.vServ.setValue(this.user);
    //   this.router.navigate(["/loginhome"]);
    // } else if (this.user == "hrhe" && this.password == "1234") {
    //   this.vServ.setValue(this.user);
    //   this.router.navigate(["/loginhome"]);
    // } else {
    //   this.sweet.showErrorMessage("Fail!!", "Ivalid Login");
    // }
  }

  // onRegister() {
  //   this.view = false;
  //     this.vServ.updateView(this.view);
  // }
}
