import { RegisterEmployee } from "../models/registeremployee";
import { Employee } from "../models/employee";
import { UserType } from "../models/usertype";
import { Designation } from "../models/designation";
export class APIResult {
  registerEmployees: RegisterEmployee[];
  employees: Employee[];
  userInfo: UserType;
  usertypes: UserType[];
  designations: Designation[];
  employeeName: string;
  commandType: string;
  employee: Employee;
  registerEmployee: RegisterEmployee;
  status: boolean;
  message: string;
  id: number;
}
