import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Router } from "@angular/router";
import * as R from "rxjs";
import { catchError } from "rxjs/internal/operators";
import swal from "sweetalert2";
import { APIResult } from "./models/apiresult";
import { AppComponent } from "./app.component";
export const CurrentUrls = {
  constants: "Constants",
  approve: "ApproveUser",
  employeelist: "employees",
  registeremployee: "RegisterEmployee",
  registeremployees: "RegisteredUsers",
  login: "Login",
  checkUsername: "CheckUserName",
  logout: "DeleteSession"
};
@Injectable()
export class PdsApiService {
  // Base url
  baseurl = "https://www.kleenandshine.com/api/";
  //baseurl = "https://localhost:44302/api/";
  usrToken: string = "";
  //constantsUrl: string = "Constants";
  financeUrl: string = "Finance/";
  employeesUrl: string = "Employee/";
  config = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  constructor(private http: HttpClient, private router: Router) {}
  posthttpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods:": "GET,POST,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "*"
    })
  };
  //   getUserTypes() :  R.Observable<any>  {
  //     console.log(this.baseurl + this.userTypesUrl);
  //   return this.http.get(this.baseurl + this.userTypesUrl,this.httpOptions)
  //
  // }
  // showloading() {
  //   this.app.showload();
  // }
  // hideloading() {
  //   //
  //   this.app.hideload();
  // }
  getConstants(): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.constants);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.constants,
      this.httpOptions
    );
  }
  //Employee login
  loginuser(username: string, password: string) {
    let input: string = "?username=" + username + "&password=" + password;
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.login + input);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.login + input,
      this.httpOptions
    );
  }
  //registered employees
  getRegisteredEmployees(input: any, tkn: string): R.Observable<any> {
    var body = JSON.stringify(input);
    const phttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + tkn
      })
    };
    //this.posthttpOptions.headers=headers;
    //this.httpOptions.headers.append("Authorization", "Bearer " + tkn);
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.registeremployees
    );
    return this.http
      .post(
        this.baseurl + this.employeesUrl + CurrentUrls.registeremployees,
        body,
        phttpOptions
      )
      .pipe(catchError((error, caught) => {
        this.handleAuthError(error);
        return oferror);
      }) as any);
  }
  //unauthorized error display
  private handleAuthError(err: HttpErrorResponse) {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log("handled error " + err.status);
      swal(
        "UnAuthorized Request!!!",
        "Session Expired, please login again!!!",
        "error"
      );
      this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
    }
  }
  // get emloyees
  getEmployees(stationCode: string = ""): R.Observable<any> {
    let input = "?stationCode=" + stationCode;
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.employeelist + input
    );
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.employeelist + input,
      this.httpOptions
    );
  }
  //signout user
  signOut(userName: string, employeeId: number, usertypeId: number) {
    let input =
      "?userName=" +
      userName +
      "&employeeId=" +
      employeeId +
      "&userTypeId=" +
      usertypeId;
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.logout + input);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.logout + input,
      this.httpOptions
    );
  }
  //approve registered        user
  approveUser(id: any, status: string): R.Observable<any> {
    let input = "?registerId=" + id + "&status=" + status;
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.approve);
    return this.http
      .put(
        this.baseurl + this.employeesUrl + CurrentUrls.approve + input,
        this.httpOptions
      )
      .pipe();
  }
  //check user name for employee registration
  checkUserName(userName: string): R.Observable<any> {
    let input = "?userName=" + userName;
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.checkUsername + input
    );
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.checkUsername + input,
      this.httpOptions
    );
  }
  //register employee POST

  registeremployee(input): R.Observable<any> {
    console.log(JSON.stringify(input));
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.registeremployee
    );
    console.log(JSON.stringify(input));
    return this.http.post<any>(
      this.baseurl + this.employeesUrl + CurrentUrls.registeremployee,
      JSON.stringify(input),
      this.posthttpOptions
    );
  }
}
