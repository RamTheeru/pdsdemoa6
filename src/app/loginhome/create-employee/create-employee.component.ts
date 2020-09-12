import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,FormArray,Validators} from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
empForm2 : FormGroup;
  constructor(private _fb:FormBuilder) { 
    this.initForm();
  }

  ngOnInit() {
  }
  initForm(){

  this.empForm2 = this._fb.group({
    firstName: new FormControl(),
    lastName: new FormControl(),
    middleName: new FormControl(),
        });

  }
  onSubmit(){

  }

}