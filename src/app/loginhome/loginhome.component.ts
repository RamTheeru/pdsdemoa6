import { Component,ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.css']
})
export class LoginhomeComponent implements OnInit {
  shoesidenav : Boolean = false;
  shownotify : Boolean = true;
  actTab:Boolean=false;
    @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  act1SubMenu: boolean = false;
   act2SubMenu: boolean = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
 //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor() { }

  ngOnInit() {
  }
  Onbtnclick(){
    this.shoesidenav = !this.shoesidenav;
  }
  oncreateclk(tab=''){
    this.shownotify=false;
    if(tab=='si'){
          this.act1SubMenu = true;
          this.act2SubMenu = false;
    }
    else if(tab=='sl'){
       this.act1SubMenu = false;
          this.act2SubMenu = true;
    }
    else{
        this.act1SubMenu = false;
          this.act2SubMenu = false;
    }

  }
  onloghomeclk(){
    this.shownotify=true;
  }

}