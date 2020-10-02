import {RegisterEmployee} from '../models/registeremployee';
import {Employee} from '../models/employee';
import {UserType} from '../models/usertype';
import {Designation} from '../models/designation';
    export  class APIResult
    {
        registerEmployees : RegisterEmployee[];
         employees  : Employee[];

         Usertypes : UserType[];
      Designations : Designation[];
        EmployeeName : string;
         CommandType : string;
        employee : Employee;
          registerEmployee : RegisterEmployee;
        Status : boolean;
         Message : string;
        Id : number;
    }