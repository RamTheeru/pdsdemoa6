import { Component, OnInit } from '@angular/core';
import {Environment} from '../../environment';
@Component({
  selector: 'app-userreadings',
  templateUrl: './userreadings.component.html',
  styleUrls: ['./userreadings.component.css']
})
export class UserreadingsComponent implements OnInit {
 blck1Text:string = '';
  blck2Text:string = '';
   blck3Text:string = '';
  constructor() { }

  ngOnInit() {
    this.blck1Text = Environment.Block1Text;
    this.blck2Text = Environment.Block2Text;
    this.blck3Text = Environment.Block3Text;

  }

}