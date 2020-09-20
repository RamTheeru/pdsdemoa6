import { Component, OnInit } from '@angular/core';
import {Environment} '../environment';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
env : Environment;
  constructor() { }

  ngOnInit() {
  }

}