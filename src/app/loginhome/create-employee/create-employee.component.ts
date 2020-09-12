import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,FormArray,Validators} from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
empForm2 : FormGroup;
  maritals = ['married','unmarried'];
   empTypes = ['permanent','contract'];
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

   focusOutFunction(field,event:any):void{

      const errorTitle : string = 'INVALID INPUT!!!';
       var txt = event.target.value;
    if(field=='fname'){
      var f = 'First Name';
      this.showrequiredMessage(f,txt,errorTitle);
         
    }
    if(field == 'phone'){
        var f = 'Employee Contact Number';
        this.showrequiredMessage(f,txt,errorTitle);
    }

  }
  showrequiredMessage(field,txt,title){
        
          var test = false;
          if(txt == '' || txt==null){
          var msg = field+' '+' field required!!';
            this._swServ.showErrorMessage(title,msg);
          }
          else if(field == 'Employee Contact Number')
          {
            var msg = field+' '+' contains Only Numbers!!';
             test = this.ValidateNumbers(txt);
             if(!test){
               this._swServ.showErrorMessage(title,msg);
               
             }


              
          }
  }

  ValidateNumbers(txt:string) : boolean{
      var val  = false;
       var regexp = new RegExp('^[0-9]+$');
       val = regexp.test(txt);
      return val;

  }

}