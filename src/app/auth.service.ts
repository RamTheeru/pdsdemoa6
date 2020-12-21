import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PdsApiService } from "./pds-api.service";
import { UserType } from "./models/usertype";
import { APIResult } from "./models/apiresult";
import { SweetService } from "./sweet.service";
@Injectable()
export class AuthService {
  token: string;
  user: UserType;
  result: APIResult;
  constructor(
    private router: Router,
    private api: PdsApiService,
    private swServ: SweetService
  ) {}

  signInuser(username: string, password: string) {
    this.api.loginuser(username, password).subscribe(
      (data: APIResult) => {
        console.log(data);
        let status: Boolean = data.Status;
        let m: string = data.Message;
        if (status) {
          this.user = data.userInfo;
        } else {
          this.swServ.showErrorMessage("Error!!!", m);
        }

        // this.router.navigate(["/loginhome"]);
        //this.token = token;
        // this.swServ.showSuccessMessage("Sucess!!", "we didit");
        // this.swServ.showMessage("SomethingWent", "wrong");
        // this.swServ.showWarning("Delete it");
      },
      err => {
        //console.log(err.message);
        this.swServ.showErrorMessage("Network Error!!!", err.message);
      }
    );
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(response => {
    //     this.router.navigate(["/"]);
    //     firebase
    //       .auth()
    //       .currentUser.getToken()
    //       .then((token: string) => (this.token = token));
    //   })
    //   .catch(error => console.log(error));
  }
  getToken() {
    // firebase
    //   .auth()
    //   .currentUser.getToken()
    //   .then((token: string) => (this.token = token));
    // return this.token;
  }
  isAuth() {
    return this.token != null;
  }
  logout() {
    // firebase.auth().signOut();
    // this.token = null;
  }
}