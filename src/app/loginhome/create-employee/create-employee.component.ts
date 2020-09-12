import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,FormArray,Validators} from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
empForm2 : FormGroup;
hidTab1 : Boolean = false;
hidTab2 : Boolean = true;
hidTab3 : Boolean = true;
dllstatselect : string = '';
  maritals = ['married','unmarried'];
   empTypes = ['permanent','contract'];
  constructor(private _fb:FormBuilder) { 
    this.initForm();
  }
  showtab(tabNum){
    if(tabNum == 1)
    {
      this.hidTab1 = false;
      this.hidTab2 = true;
      this.hidTab3 = true;
    }
    else if (tabNum == 2)
    {
      this.hidTab1 = true;
      this.hidTab2 = false;
      this.hidTab3 = true;

    }
    else if (tabNum == 3)
    {
            this.hidTab1 = true;
      this.hidTab2 = true;
      this.hidTab3 = false;

    }
  }


  ngOnInit() {
          this.hidTab1 = false;
      this.hidTab2 = true;
      this.hidTab3 = true;
  }
  initForm(){

  this.empForm2 = this._fb.group({
   firstName: new FormControl(),
    lastName: new FormControl(),
    middleName: new FormControl(),
    birthdate : new FormControl(),
     joindate : new FormControl(),
    //  day: new FormControl(),
    //   month: new FormControl(''),
    //    year: new FormControl(),
        age: new FormControl(),
        bg: new FormControl(),
         gender: new FormControl(''),
         married :  new FormControl(),
              unmarried :  new FormControl(),
                  permanent :  new FormControl(),
              contract :  new FormControl(),
     // mars:new FormArray([]),
       ad1: new FormControl(),
        ad2: new FormControl(),
         place: new FormControl(),
          state: new FormControl(),
           postal: new FormControl(),
            aad: new FormControl(),
        pan: new FormControl(),
        //typs : new FormArray([]),
            gName: new FormControl(),
    gphone : new FormControl(),
         day2: new FormControl(),
      month2: new FormControl(''),
       year2: new FormControl(),
        ut: new FormControl(''),
         desg: new FormControl(''),
          station: new FormControl(),
           location: new FormControl(),
            account: new FormControl(),
             ifsc: new FormControl(),
              bank: new FormControl(),
               bbranch: new FormControl(),
                             veh: new FormControl(),
               dllr: new FormControl(),
               dlstat: new FormControl()
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
           // this._swServ.showErrorMessage(title,msg);
          }
          else if(field == 'Employee Contact Number')
          {
            var msg = field+' '+' contains Only Numbers!!';
             test = this.ValidateNumbers(txt);
             if(!test){
             //  this._swServ.showErrorMessage(title,msg);
               
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