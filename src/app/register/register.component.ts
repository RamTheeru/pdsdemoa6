import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,FormArray,Validators} from '@angular/forms';

import {PdsApiService} from '../pds-api.service';
import {SweetService} from '../sweet.service';
import {UserType} from '../models/usertype';
import {Employee} from '../models/employee';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[SweetService]
})
export class RegisterComponent implements OnInit {
  employee
loaded : boolean = false;
 
dates =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
userTypes : UserType[];
empForm : FormGroup;
  maritals = [
    { id: 0, name: 'Married' },
    { id: 1, name: 'Un Married' }

  ];
    empTypes = [
    { id: 0, name: 'Permanent' },
    { id: 1, name: 'Contract' }

  ];
  constructor(private _fb:FormBuilder,private api:PdsApiService,private _swServ:SweetService) {
     this.initForm();
    this.addCheckboxes();
    this.addCheckboxes_t();
   }

   ngOnInit() {
     
  //  this.api.getUserTypes().subscribe(
  //    (data)=>{
  //         this.userTypes = data.usersTypes;
  //    }
  //  )
  //  console.log('UserTypes :'+this.empTypes );
    //this.addCheckboxes();
  }

initForm(){

  this.empForm = this._fb.group({
    firstName: new FormControl(),
    lastName: new FormControl(),
    middleName: new FormControl(),
     day: new FormControl(),
      month: new FormControl(''),
       year: new FormControl(),
        age: new FormControl(),
        bg: new FormControl(),
         gender: new FormControl(''),
      /mars:new FormArray([]),
       ad1: new FormControl(),
        ad2: new FormControl(),
         place: new FormControl(),
          state: new FormControl(),
           postal: new FormControl(),
            aad: new FormControl(),
        pan: new FormControl(),
        typs : new FormArray([]),
            gfirstName: new FormControl(),
    glastName: new FormControl(),
    gmiddleName: new FormControl(),
    gphone : new FormControl(),
         day2: new FormControl(),
      month2: new FormControl(''),
       year2: new FormControl(),
        ut: new FormControl(''),
         desg: new FormControl(''),
          station: new FormControl(),
           location: new FormControl()
        
    });
}
 get maritalsFormArray() {
    return this.empForm.controls.mars as FormArray;
  }
 private addCheckboxes() {
    this.maritals.forEach(() => this.maritalsFormArray.push(new FormControl(false)));
  }
   private addCheckboxes_t() {
    this.empTypes.forEach(() => this.typsFormArray.push(new FormControl(false)));
  }
   get typsFormArray() {
    return this.empForm.controls.typs as FormArray;
  }
  onSubmit(){
   const emp : Employee = new Employee();
    const errorTitle : string = 'INVALID INPUT!!!';
    //this.loaded = true;
    const selectedmaritals = this.empForm.value.mars
      .map((checked, i) => checked ? this.maritals[i].name : null)
      .filter(v => v !== null);
      console.log('checkboxes')
      console.log(selectedmaritals);

      const selectempTypes = this.empForm.value.typs
      .map((checked, i) => checked ? this.empTypes[i].name : null)
      .filter(v => v !== null);
      console.log('checkboxes')
      console.log(selectempTypes);
     emp.FirstName = this.empForm.value['firstName'];
     emp.LastName = this.empForm.value['lastName'];
     emp.MiddleName = this.empForm.value['middleName'];
     emp.Phone = this.empForm.value['phone'];
     emp.Day = this.empForm.value['day'];
     emp.Month = this.empForm.value['month'];
     emp.Year = this.empForm.value['year'];
     emp.Age = this.empForm.value['age'];
     emp.BloodGroup = this.empForm.value['bg'];
     emp.Gender = this.empForm.value['gender'];
     if(selectedmaritals.length>0)
     {
      emp.Marital = selectedmaritals[0];
      if(emp.Marital == "Married"){
        emp.MaritalStatus = true;
      }
      else{emp.MaritalStatus= false;}
     }
     else{
       emp.MaritalStatus= false;
         var txt = '';
        var f = 'Employee Marital Status';
         this.showrequiredMessage(f,'',errorTitle);
       }

     if(selectempTypes.length>0)
     {
        emp.Employeetype = selectempTypes[0];
        if(emp.Employeetype == "Permanent"){
        emp.IsPermanent = true;
      }
      else{emp.IsPermanent= false;}
     }
     else
     {
       emp.IsPermanent= false;
        var txt = '';
        var f = 'Employee Type ';
        this.showrequiredMessage(f,'',errorTitle);
       
       }

      emp.Address1 = this.empForm.value['ad1'];
      emp.Adress2 = this.empForm.value['ad2'];
      emp.Place = this.empForm.value['place'];
      emp.State = this.empForm.value['state'];
      emp.PostalCode = this.empForm.value['postal'];
      emp.AAdharNumber = this.empForm.value['aad'];
      emp.PAN = this.empForm.value['pan'];
      emp.Guard_FirstName = this.empForm.value['gfirstName'];
      emp.Guard_LastName = this.empForm.value['glastName'];
      emp.Guard_MiddleName = this.empForm.value['gmiddleName'];
      emp.Guard_Phone = this.empForm.value['gphone'];
      emp.Day2 = this.empForm.value['day2'];
      emp.Month2 = this.empForm.value['month2'];
      emp.Year2 = this.empForm.value['year2'];
      emp.LoginType = this.empForm.value['ut'];
      emp.Designation = this.empForm.value['desg'];
      emp.StationCode = this.empForm.value['station'];
      emp.LocationName = this.empForm.value['location'];

      console.log('on submit.....');
         
         console.log(emp);

        //  setTimeout(function(){
        //     this.loaded=false;

        //  },2000);
         



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
  checkValue(event:any,field){
    const emp : Employee = new Employee();
        const errorTitle : string = 'INVALID INPUT!!!';
        if(field=='mars'){
              const selectedmaritals = this.empForm.value.mars
                  .map((checked, i) => checked ? this.maritals[i].name : null)
                  .filter(v => v !== null);

          

                if(selectedmaritals.length>0)
                {
                  emp.Marital = selectedmaritals[0];
                  if(emp.Marital == "Married"){
                    emp.MaritalStatus = true;
                  }
                  else{
                    emp.MaritalStatus= false;

                    }
                }
                else
                {
                  emp.MaritalStatus= false;
                    var txt = '';
                    var f = 'Employee Marital Status';
                    this.showrequiredMessage(f,'',errorTitle);
                    

                }
        }
        else{
                    const selectempTypes = this.empForm.value.typs
                .map((checked, i) => checked ? this.empTypes[i].name : null)
                .filter(v => v !== null);

                if(selectempTypes.length>0)
                {
                  emp.Employeetype = selectempTypes[0];
                    if(emp.Employeetype == "Permanent"){
                    emp.IsPermanent = true;
                  }
                  else{emp.IsPermanent= false;}
                }
                else
                {
                  emp.IsPermanent= false;
                    var txt = '';
                    var f = 'Employee Type ';
                    this.showrequiredMessage(f,'',errorTitle);

                }


        }
          
 

  }

  
}