import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as R from "rxjs";
import { AppComponent } from "./app.component";
export const CurrentUrls = {
  constantsUrl: "Constants",
  approveUrl: "ApproveUser",
  employeelist: "employees",
  loginUrl: "Login"
};
@Injectable()
export class PdsApiService {
  // Base url
  baseurl = "http://www.kleenandshine.com/api/";
  //baseurl = "https://localhost:44302/api/";
  app: AppComponent;
  //constantsUrl: string = "Constants";
  financeUrl: string = "Finance/";
  employeesUrl: string = "Employee/";

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods:": "GET,POST,OPTIONS,DELETE,PUT",
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
    this.app.hideload();
  }
  getConstants(): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.constantsUrl);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.constantsUrl,
      this.httpOptions
    );
  }
  loginuser(username: string, password: string) {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.loginUrl);
    let input = "?username=" + username + "&password=" + password;
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.loginUrl + input,
      this.httpOptions
    );
  }
  getEmployees(stationCode: string = ""): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.employeelist);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.employeelist,
      this.httpOptions
    );
  }
  approveUser(id: any): R.Observable<any> {
    //k
    console.log(this.baseurl + this.employeesUrl + CurrentUrls.approveUrl);
    return this.http.get(
      this.baseurl + this.employeesUrl + CurrentUrls.approveUrl,
      this.httpOptions
    );
  }
}
