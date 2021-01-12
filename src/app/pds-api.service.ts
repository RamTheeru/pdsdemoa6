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
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/observable/empty";
import "rxjs/add/operator/retry"; // don't forget the imports
import { Observable, EMPTY, throwError, of } from "rxjs";
import { APIResult } from "./models/apiresult";
import { AppComponent } from "./app.component";
export const CurrentUrls = {
  constants: "Constants",
  approve: "ApproveUser",
  employeelist: "employees",
  registeremployee: "RegisterEmployee",
  registeremployees: "RegisteredUsers",
  createemployee: "CreateEmployee",
  login: "Login",
  employeelogins: "Logins",
  checkUsername: "CheckUserName",
  adminDetails: "AdminDetails",
  logout: "DeleteSession"
};
@Injectable()
export class PdsApiService {
  // Base url
  baseurl = "https://www.kleenandshine.com/api/";
  //baseurl = "https://localhost:9900/api/";
  usrToken: string = "";
  apiResult: APIResult;
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
  transform(value): any {
    let res = [];
    for (let i = 1; i <= value; i++) {
      res.push(i);
    }
    return res;
  }
  getConstants(): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.constants);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.constants,
      this.httpOptions
    );
  }
  //get admin details
  getadmindetails(): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.adminDetails);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.adminDetails,
      this.httpOptions
    );
  }
  //Employee login
  loginuser(username: string, password: string) {
    let input: string = "?username=" + username + "&password=" + password;
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.login + input);
    return this.http
      .get(
        this.baseurl + this.employeesUrl + CurrentUrls.login + input,
        this.httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
      );
  }
  //logins list of   employees
  getemployeelogins(input: any, tkn: string): R.Observable<any> {
    var body = JSON.stringify(input);
    const phttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + tkn
      })
    };
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.employeelogins);
    return this.http
      .post(
        this.baseurl + this.employeesUrl + CurrentUrls.employeelogins,
        body,
        phttpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
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
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
      );
  }
  private handlehttpError(err: HttpErrorResponse) {
    let obj = {};
    if (err.status === 401) {
      this.handleAuthError(err);
    } else {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.

        swal(
          "Client Side Error!!!",
          "An error occurred :" + err.error.message.toString(),
          "error"
        );
      } else {
        let apierrResult: APIResult = new APIResult();
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${err.status}, body was: ${err.error}`
        );
        obj = err.error;
        let m: string = "";
        if ("title" in obj) {
          m = obj.title;
        } else if ("errors" in obj) {
          m = m + "Reason : " + JSON.stringify(this.printObject(obj.errors));
        }
        apierrResult.status = false;
        apierrResult.message = m;
        obj = apierrResult;
      }

      // ...optionally return a default fallback value so app can continue (pick one)
      // which could be a default value
      // return Observable.of<any>({my: "default value..."});
      // or simply an empty observable
      //return Observable.empty<T>();
    }
    return obj;
  }
  printObject(obj: any) {
    const keys = Object.keys(obj);
    const values = keys.map(key => `${key}: ${Reflect.get(obj, key)}`);
    return values;
  }
  //unauthorized error display
  private handleAuthError(err: HttpErrorResponse) {
    //handle your auth error or rethrow

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
  // get emloyees
  getEmployees(stationCode: string = ""): R.Observable<any> {
    let input = "?stationCode=" + stationCode;
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.employeelist + input
    );
    return this.http
      .get(
        this.baseurl + this.employeesUrl + CurrentUrls.employeelist + input,
        this.httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
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
    return this.http
      .get(
        this.baseurl + this.employeesUrl + CurrentUrls.logout + input,
        this.httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let ob: any = {};
          ob = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(ob);
          });
        })
      );
  }
  //approve registered        user
  approveUser(
    id: any,
    status: string,
    pId: number,
    empCode: string
  ): R.Observable<any> {
    let input =
      "?registerId=" +
      id +
      "&status=" +
      status +
      "&pId=" +
      pId +
      "&empCode=" +
      empCode;
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.approve);
    return this.http
      .put(
        this.baseurl + this.employeesUrl + CurrentUrls.approve + input,
        this.httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
      );
  }
  //check user name for employee registration
  checkUserName(userName: string): R.Observable<any> {
    let input = "?userName=" + userName;
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.checkUsername + input
    );
    return this.http
      .get(
        this.baseurl + this.employeesUrl + CurrentUrls.checkUsername + input,
        this.httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
      );
  }
  //register employee POST

  registeremployee(input): R.Observable<any> {
    console.log(JSON.stringify(input));
    console.log(
      this.baseurl + this.employeesUrl + CurrentUrls.registeremployee
    );
    console.log(JSON.stringify(input));
    return this.http
      .post<any>(
        this.baseurl + this.employeesUrl + CurrentUrls.registeremployee,
        JSON.stringify(input),
        this.posthttpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
      );
  }

  //Create employee POST

  createemployee(input, tkn): R.Observable<any> {
    const phttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + tkn
      })
    };
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.createemployee);
    return this.http
      .post<any>(
        this.baseurl + this.employeesUrl + CurrentUrls.createemployee,
        JSON.stringify(input),
        phttpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let obj = this.handlehttpError(error);
          console.log(obj);
          return new Observable(function(x) {
            x.next(obj);
          });
        })
      );
  }
}
