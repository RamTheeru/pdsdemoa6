import { RegisterEmployee } from "../models/registeremployee";
import { Employee } from "../models/employee";
import { UserType } from "../models/usertype";
import { Station } from "../models/station";
import { Voucher } from "../models/voucher";
import { Ledger } from "../models/ledger";
import { Profession } from "../models/profession";
import { Designation } from "../models/designation";
export class APIResult {
        employees : Employee[];
         userInfo : UserType;
         registerEmployees : RegisterEmployee[];
         usertypes : UserType[];
        designations : Designation[]; 
         vouchers : Voucher[];
         ledgers : Ledger[];
         stations : Station[];
         voucher : Voucher;
         ledger : Ledger;
         professions : Profession[]
         employeeName :string;
         queryTotalCount : number;
        queryPages : number;
         voucherNumber : string;
        commandType : string;
         employee : Employee;
         registerEmployee : RegisterEmployee;
       status : boolean;
         message : string;
        id : number;
}
