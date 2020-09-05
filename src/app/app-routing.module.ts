import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PdsMainComponent} from './pds-main/pds-main.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {AbtusComponent} from './abtus/abtus.component';
import {RegisterComponent} from './register/register.component';
const appRoutes : Routes =[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent },
  {path:'login',component:PdsMainComponent},
  {path:'vision',component:AboutusComponent},
  {path:'aboutus',component:AbtusComponent},
  {path:'register',component:RegisterComponent}
]

@NgModule({
imports:[RouterModule.forRoot(appRoutes)],
exports:[RouterModule]
})
export class appRoutingModule{


}