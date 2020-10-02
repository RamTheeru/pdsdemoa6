import { Component,  OnInit } from '@angular/core';
import {Employee} from '../../models/employee';
import {PdsApiService} from '../../pds-api.service';
import {SweetService} from '../../sweet.service';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
employees : Employee[];
stationCode:string='';
isHide = true;
  constructor(private api:PdsApiService,private swServ:SweetService) { }

  ngOnInit() {
       this.api.getEmployees()
        .subscribe(data =>{
          console.log(data); 
              let status = data.Status;
              let message = data.Message;
              
              if(status)
              {
                  this.employees = data.employees;
              }
              else{
                   this.swServ.showErrorMessage('Failure',message);
              }
           }
           );
    //this.swServ.showSuccessMessage('Sucess!!','we didit');
   
    //this.swServ.showWarning('Delete it')
  }
  getemployeesbyStation(){
          this.api.getEmployees(this.stationCode)
        .subscribe(data =>{
          console.log(data); 
              let status = data.Status;
              let message = data.Message;
               if(status)
              {
                  this.employees = data.employees;
              }
              else{
                   this.swServ.showErrorMessage('Failure',message);
              }
           }
           );
  }

}