import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.css']
})
export class LoginhomeComponent implements OnInit {
  shoesidenav : Boolean = false;
 //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor() { }

  ngOnInit() {
  }
  Onbtnclick(){
    this.shoesidenav = !this.shoesidenav;
  }

}