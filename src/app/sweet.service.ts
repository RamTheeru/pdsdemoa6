import { Injectable } from "@angular/core";
import swal from "sweetalert2";
import * as R from "rxjs";
import { PdsApiService } from "./pds-api.service";

@Injectable()
export class SweetService {
  r: Promise<boolean>;
  constructor() {}

  showSuccessMessage(title, text = "") {
    swal(title, text, "success");
  }
  showErrorMessage(title, text = "") {
    swal(title, text, "error");
  }

  async showWarning(text, obj?: any) {
    let r: Promise<boolean>;
    let result = false;
    swal({
      title: "Are you sure?",
      text: text,
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(willDelete => {
      if (willDelete.value) {
        result = true;
        // r = new Promise<boolean>((resolve,reject) => {
        //   if (willDelete.value) {
        // resolve(true);
        // }else{
        //   reject(false);
        // });
        // if (willDelete.value) {
        //   result = true;
        //   this.r = new Promise<boolean>((resolve, reject) => {
        //     if (result) {
        //       resolve(result);
        //     } else {
        //       reject(result);
        //     }
        //   });
      } else {
        result = false;
        // this.r = new Promise<boolean>((resolve, reject) => {
        //   if (result) {
        //     reject(result);
        //   }
        // });
      }
    });
    await this.setpromise(result);
    // await (() => {
    //   return result;
    // });
    // this.r = new Promise<boolean>((resolve, reject) => {
    //   if (result) {
    //     resolve(result);
    //   } else {
    //     reject(result);
    //   }
    // });
    // return this.r;
  }
  async setpromise(val: boolean) {
    await (() => {
      this.r = new Promise<boolean>((resolve, reject) => {
        if (val) {
          resolve(val);
        } else {
          reject(val);
        }
      });
    });
  }
  getpromise() {
    return this.r;
  }
}
