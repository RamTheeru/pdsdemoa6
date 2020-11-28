import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Environment } from "../environment";
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
  user: string;
  password: string;
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
    //this.autServ.signInuser(this.user, this.password);
    if (this.user == "financele" && this.password == "1234") {
      this.vServ.setValue(this.user);
      this.router.navigate(["/loginhome"]);
    } else if (this.user == "financehe" && this.password == "1234") {
      this.vServ.setValue(this.user);
      this.router.navigate(["/loginhome"]);
    } else if (this.user == "executivele" && this.password == "1234") {
      this.vServ.setValue(this.user);
      this.router.navigate(["/loginhome"]);
    } else if (this.user == "executivehe" && this.password == "1234") {
      this.vServ.setValue(this.user);
      this.router.navigate(["/loginhome"]);
    } else if (this.user == "hrle" && this.password == "1234") {
      this.vServ.setValue(this.user);
      this.router.navigate(["/loginhome"]);
    } else if (this.user == "hrhe" && this.password == "1234") {
      this.vServ.setValue(this.user);
      this.router.navigate(["/loginhome"]);
    } else {
      this.sweet.showErrorMessage("Fail!!", "Ivalid Login");
    }
  }

  // onRegister() {
  //   this.view = false;
  //     this.vServ.updateView(this.view);
  // }
}
