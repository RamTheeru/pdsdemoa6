import { Component, OnInit } from '@angular/core';
import {Environment} from '../environment';
//import {ViewService} from '../view.service';

@Component({
  selector: 'app-pds-main',
  templateUrl: './pds-main.component.html',
  styleUrls: ['./pds-main.component.css']
})
export class PdsMainComponent implements OnInit {
  img : string ;
  view : Boolean = true;
  constructor() { }

  ngOnInit() {
  
     this.img = Environment.MainLogo;
   
  }
  // onRegister(){
  //   this.view = false;
  //     this.vServ.updateView(this.view);
  // }

}