import { Component, OnInit } from '@angular/core';
import {Environment} from '../environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
img : string ;
  constructor() { }

  ngOnInit() {
    this.img = Environment.MainLogo;
  }

}