import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-downloadinvoice",
  templateUrl: "./downloadinvoice.component.html",
  styleUrls: ["./downloadinvoice.component.css"]
})
export class DownloadinvoiceComponent implements OnInit {
  showPath: boolean = false;
  path: string = "";
  constructor() {}
  shwPath() {
    if (!this.showPath) {
      this.showPath = true;
    }
  }
  ngOnInit() {}
  Onsub() {}
}
