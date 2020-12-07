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

  showWarning(text, obj?: any): R.Observable<any> {
    let r: R.Observable<any>;
    swal({
      title: "Are you sure?",
      text: text,
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(willDelete => {
      if (willDelete.value) {
        swal("Success");
        // r = this.api.approveUser(obj);
      } else {
        swal("Fail");
      }
    });
    return r;
  }
}
