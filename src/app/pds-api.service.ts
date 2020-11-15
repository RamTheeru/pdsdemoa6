import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as R from "rxjs";
import { AppComponent } from "./app.component";
@Injectable()
export class PdsApiService {
  // Base url
  //baseurl = 'http://35.153.184.145/api/Employee/';
  baseurl = "https://localhost:44302/api/Employee/";

  constantsUrl: string = "UserTypes";
  employeesUrl: string = "Employees";
  approveUrl: string = "ApproveUser";

  constructor(private http: HttpClient, private app: AppComponent) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
      //'X-Requested-With': 'XMLHttpRequest',
      //'Access-Control-Allow-Origin': '*'
      //'access-Control-Allow-Methods:':'GET,POST,OPTIONS,DELETE,PUT'
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
    console.log(this.baseurl + this.constantsUrl);
    return this.http.get(this.baseurl + this.constantsUrl, this.httpOptions);
  }
  getEmployees(stationCode: string = ""): R.Observable<any> {
    console.log(this.baseurl + this.employeesUrl);
    return this.http.get(this.baseurl + this.employeesUrl, this.httpOptions);
  }
  approveUser(id: any): R.Observable<any> {
    console.log(this.baseurl + this.approveUrl);
    return this.http.get(this.baseurl + this.approveUrl, this.httpOptions);
  }
}
