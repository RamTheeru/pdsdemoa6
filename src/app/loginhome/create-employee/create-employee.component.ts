import { Component, OnInit,AfterViewInit ,ViewChild,ElementRef } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,FormArray,Validators} from '@angular/forms';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit,AfterViewInit  {
  @ViewChild('someInput') someInput: ElementRef;
  tab1Id = 'pills-home';
   tab2Id = 'pills-profile';
    tab3Id = 'pills-contact';
    hidPrev : Boolean = true;
    hidNext : Boolean = false;
  empId : number;
  
   editMode = false;
   indiView = false;
   activeTab:number;
    childClassess =[];
empForm2 : FormGroup;
hidTab1 : Boolean = false;
hidTab2 : Boolean = true;
hidTab3 : Boolean = true;
  maritals = ['married','unmarried'];
   empTypes = ['permanent','contract'];
  constructor(private _fb:FormBuilder,private route : ActivatedRoute) { 
    this.initForm();
  
  }
    ngAfterViewInit() {
      console.log('ElementRef');
       this.childClassess = this.someInput.nativeElement.children;
    
       
      for (var val of this.childClassess) {
  //console.log(val.id)
   //console.log(val.className)
    var index = val.className.indexOf('active'); 
        if(this.tab1Id == val.id && index !== -1)
        {
          this.activeTab = 1;
            this.showtab(1);
            this.hidPrev  = true;
           this.hidNext = false;

        }
        else if(this.tab2Id == val.id && index !== -1){
          this.activeTab = 2;
             this.showtab(2);
            this.hidPrev  = false;
           this.hidNext = false;
        }
        else if(this.tab3Id == val.id && index !== -1){
               this.activeTab = 3;
               this.showtab(3);
                this.hidPrev  = false;
            this.hidNext = true;
        }
      }
  }
  onchangetab(text:string){
      if(this.activeTab == 3)
      {
            this.hidPrev  = false;
           this.hidNext = true;
        
      }
      else if(this.activeTab == 1)
      {
            this.hidPrev  = true;
           this.hidNext = false;
              
      }
      else if(this.activeTab == 2){
            this.hidPrev  = false;
           this.hidNext = false;

      }
      if(text == 'p'){
          this.activeTab = this.activeTab - 1;
      }
      else if(text == 'n'){
           this.activeTab = this.activeTab + 1;
      }
      this.showtab(this.activeTab);
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
      this.route.params.subscribe(
      (params:Params)=>{
            this.empId=+params['id'];
            let vw = this.route.url['_value'];
            let str = vw[0].path;
             let index = str.indexOf('individual'); 
             console.log(index);
            // if(index!=="-1")
            // {
            //   this.showbtns = true;
            // }
            // else{
            //   this.showbtns = false;
            // }
            this.editMode = params['id'] != null;
            this.initForm();
      }
    )
  }
 private initForm(){
   if(this.editMode)
   {
     let eDate = new FormControl(new Date('09/15/1990')); 
       this.empForm2 = this._fb.group({
   firstName: new FormControl('testfirst'),
    lastName: new FormControl('testlast'),
    middleName: new FormControl('middleNametest'),
    birthdate : eDate,//new FormControl('09/15/1990'),
     joindate : eDate,//new FormControl('09/15/2020'),
    //  day: new FormControl(),
    //   month: new FormControl(''),
    //    year: new FormControl(),
        age: new FormControl('28'),
        bg: new FormControl('BPositive'),
         gender: new FormControl('male'),
         married :  new FormControl(),
              unmarried :  new FormControl('true'),
                  permanent :  new FormControl('true'),
              contract :  new FormControl(),
     // mars:new FormArray([]),
       ad1: new FormControl('testad1'),
        ad2: new FormControl('testad2'),
         place: new FormControl('testplace'),
          state: new FormControl('teststate'),
           postal: new FormControl('testpostal'),
            aad: new FormControl('aadtest'),
        pan: new FormControl('pantest'),
        //typs : new FormArray([]),
            phone : new FormControl('313131'),
            gName: new FormControl('stestgnamde'),
    gphone : new FormControl('313131'),
      //    day2: new FormControl(),
      // month2: new FormControl(''),
      //  year2: new FormControl(),
       // ut: new FormControl(''),
         desg: new FormControl('Su'),
          station: new FormControl('teststation'),
           location: new FormControl('testloaction'),
            account: new FormControl('3242533'),
             ifsc: new FormControl('ICIC21421'),
              bank: new FormControl('ICIC'),
               bbranch: new FormControl('Hitech'),
                             veh: new FormControl('testvehicle'),
               dllr: new FormControl('testdl'),
               dlstat: new FormControl('DL')
        });


   }
   else{
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
           phone : new FormControl(),
        //typs : new FormArray([]),
            gName: new FormControl(),
    gphone : new FormControl(),
      //    day2: new FormControl(),
      // month2: new FormControl(''),
      //  year2: new FormControl(),
      //   ut: new FormControl(''),
         desg: new FormControl(''),
          station: new FormControl(),
           location: new FormControl(),
            account: new FormControl(),
             ifsc: new FormControl(),
              bank: new FormControl(),
               bbranch: new FormControl(),
                             veh: new FormControl(),
               dllr: new FormControl(),
               dlstat: new FormControl('')
        });
   }

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