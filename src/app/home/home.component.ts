import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
img : string ;
  constructor() { }

  ngOnInit() {
    this.img = 'https://github.com/RamTheeru/pds/blob/master/src/app/images/pdslogo.jpeg?raw=true'
  }

}