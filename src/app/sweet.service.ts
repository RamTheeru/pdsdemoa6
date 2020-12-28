import { Injectable } from "@angular/core";
import swal from "sweetalert2";
import * as R from "rxjs";
import { PdsApiService } from "./pds-api.service";

@Injectable()
export class SweetService {
  constructor() {}

  showSuccessMessage(title, text = "") {
    swal(title, text, "success");
  }
  showErrorMessage(title, text = "") {
    swal(title, text, "error");
  }

  showWarning(text, obj?: any): Promise<boolean> {
    let r: Promise<boolean>;
    let result = false;
    swal({
      title: "Are you sure?",
      text: text,
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(willDelete => {
      // r = new Promise<boolean>((resolve,reject) => {
      //   if (willDelete.value) {
      // resolve(true);
      // }else{
      //   reject(false);
      // });
      if (willDelete.value) {
        result = true;
        r = new Promise<boolean>((resolve, reject) => {
          if (result) {
            resolve(result);
          }
        });
      } else {
        result = false;
        r = new Promise<boolean>((resolve, reject) => {
          if (result) {
            reject(result);
          }
        });
      }
    });

    return r;
  }
}
