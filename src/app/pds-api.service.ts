import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as R from 'rxjs';
@Injectable()
export class PdsApiService {



   // Base url
   baseurl = 'http://35.153.184.145/api/Employee/';
  //baseurl='http://localhost:44302/api/Employee/';

   userTypesUrl : string = 'UserTypes';
     constructor(private http: HttpClient) { }
      httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
      'access-Control-Allow-Origin': '*'
       //'access-Control-Allow-Methods:':'GET,POST,OPTIONS,DELETE,PUT'
    })
  }
  getUserTypes() :  R.Observable<any>  {
    console.log(this.baseurl + this.userTypesUrl);
  return this.http.get(this.baseurl + this.userTypesUrl,this.httpOptions)

}

}