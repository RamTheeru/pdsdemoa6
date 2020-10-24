import { Injectable } from "@angular/core";
import * as r from "rxjs";

@Injectable()
export class ViewService {
  //view = new r.Subject<Boolean>();
  data = new r.BehaviorSubject<string>("");
  verify = new r.BehaviorSubject<string>("");
  constructor() {
    // let verifyval = localStorage.getItem("fheverify");
    // if (verifyval == "undefined" || verifyval == "" || verifyval == null)
    //   this.setVerify(verifyval, true);
    // else this.setVerify(verifyval, false);
    // let storedProp = localStorage.getItem("storedProp");
    // if (storedProp == "undefined" || storedProp == "" || storedProp == null)
    //   this.setValue(storedProp, true);
    // else this.setValue(storedProp, false);
  }
  setValue(val: string, storeProp: boolean = true) {
    this.data = new r.BehaviorSubject<string>("");
    if (storeProp) localStorage.setItem("storedProp", val);
    this.data.next(val);
  }
  getValue() {
    return localStorage.getItem("storedProp");
  }
  removeValue(key: string) {
    localStorage.removeItem(key);
    if (key == "fheverify") this.verify.next(null);
    else if (key == "edleverify") this.verify.next(null);
    else if (key == "storedProp") this.data.next(null);
    else this.data.next(null);
  }
  setVerify(val: string, storeProp: boolean = true) {
    if (storeProp && val == "fhe") localStorage.setItem("fheverify", val);
    else if (storeProp && val == "edle")
      localStorage.setItem("edleverify", val);
    this.verify.next(val);
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
