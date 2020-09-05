import { Component, OnInit } from '@angular/core';
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
  
     this.img = 'https://github.com/RamTheeru/pds/blob/master/src/app/images/pdslogo.jpeg?raw=true';
   
  }
  // onRegister(){
  //   this.view = false;
  //     this.vServ.updateView(this.view);
  // }

}