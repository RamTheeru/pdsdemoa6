import { Injectable } from "@angular/core";
import * as r from "rxjs";

@Injectable()
export class ViewService {
  //view = new r.Subject<Boolean>();
  data = new r.BehaviorSubject<string>("");
  verify = new r.BehaviorSubject<string>("");
  verify2 = new r.BehaviorSubject<string>("");
  constructor() {
    let verifyval = localStorage.getItem("fheverify");
    if (verifyval == "undefined" || verifyval == "" || verifyval == null)
      this.setVerify(verifyval, true);
    else this.setVerify(verifyval, false);

    let verifyval2 = localStorage.getItem("edleverify");
    if (verifyval2 == "undefined" || verifyval2 == "" || verifyval2 == null)
      this.setVerify(verifyval2, true);
    else this.setVerify(verifyval2, false);

    let verifyval3 = localStorage.getItem("evheverify");
    if (verifyval3 == "undefined" || verifyval3 == "" || verifyval3 == null)
      this.setVerify(verifyval3, true);
    else this.setVerify(verifyval3, false);

    let storedProp = localStorage.getItem("storedProp");
    if (storedProp == "undefined" || storedProp == "" || storedProp == null)
      this.setValue(storedProp, true);
    else this.setValue(storedProp, false);
  }
  setValue(val: string, storeProp: boolean = true) {
    this.data = new r.BehaviorSubject<string>("");
    if (storeProp) localStorage.setItem("storedProp", val);
    this.data.next(val);
  }
  getValue(key) {
    return localStorage.getItem(key);
  }
  removeValue(key: string) {
    localStorage.removeItem(key);
    if (key == "fheverify") this.verify.next(null);
    else if (key == "edleverify") this.verify.next(null);
    else if (key == "evheverify") this.verify2.next(null);
    else if (key == "storedProp") this.data.next(null);
  }
  setVerify(val: string, storeProp: boolean = true) {
    // this.verify = new r.BehaviorSubject<string>("");
    if (storeProp && val == "fhe") {localStorage.setItem("fheverify", val);
    this.verify.next(val);
    }
    else if (storeProp && val == "edle") {
      localStorage.setItem("edleverify", val);
      this.verify.next(val);
    } else if (storeProp && val == "evhe") {
      localStorage.setItem("evheverify", val);
      this.verify2.next(val);
    }

    //hkugk
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
