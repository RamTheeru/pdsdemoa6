import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as R from "rxjs";
import { APIResult } from "./models/apiresult";
import { AppComponent } from "./app.component";
export const CurrentUrls = {
  constants: "Constants",
  approve: "ApproveUser",
  employeelist: "employees",
  registeremployee: "RegisterEmployee",
  login: "Login",
  checkUsername: "CheckUserName"
};
@Injectable()
export class PdsApiService {
  // Base url
  baseurl = "https://www.kleenandshine.com/api/";
  //baseurl = "https://localhost:44302/api/";
  app: AppComponent;
  //constantsUrl: string = "Constants";
  financeUrl: string = "Finance/";
  employeesUrl: string = "Employee/";
  config = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  constructor(private http: HttpClient) {}
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
  showloading() {
    this.app.showload();
  }
  hideloading() {
    //
    this.app.hideload();
  }
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
  //approve registered user
  approveUser(id: any): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.approve);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.approve,
      this.httpOptions
    );
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
