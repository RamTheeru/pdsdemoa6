import { Injectable } from "@angular/core";
import * as r from "rxjs";

@Injectable()
export class ViewService {
  //view = new r.Subject<Boolean>();
  data = new r.BehaviorSubject<string>("");
  constructor() {
    let storedProp = localStorage.getItem("storedProp");
    console.log("stored value check:" + storedProp);
    if (storedProp == "undefined" || storedProp == "" || storedProp == null)
      this.setValue(storedProp, true);
    else this.setValue(storedProp, false);
  }
  setValue(val: string, storeProp: boolean = true) {
    if (storeProp) localStorage.setItem("storedProp", val);
    this.data.next(val);
  }
  // setValue(value: string) {
  //   this.data.next(value);
  // }
  // getValue() {
  //   return this.data;
  // }
  //value = true;
  // updateView(val){
  //     this.view.next(val);
  // }
}
