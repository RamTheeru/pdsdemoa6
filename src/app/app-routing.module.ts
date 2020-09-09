import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PdsMainComponent} from './pds-main/pds-main.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {AbtusComponent} from './abtus/abtus.component';
import {RegisterComponent} from './register/register.component';
import {LoginhomeComponent} from './loginhome/loginhome.component';
import {UserreadingsComponent} from './loginhome/userreadings/userreadings.component';
const appRoutes : Routes =[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent },
  {path:'login',component:PdsMainComponent},
  {path:'vision',component:AboutusComponent},
  {path:'aboutus',component:AbtusComponent},
  {path:'register',component:RegisterComponent},
  {
    path:'loginhome',component:LoginhomeComponent,
      children:[
     { path :'' ,component : UserreadingsComponent}
    //  {path : 'new',component: RecipeEditComponent ,canActivate:[AuthGuard]},
    //  {path : ':id',component: RecipeDetailComponent },
      
    //    {path : ':id/edit',component: RecipeEditComponent,canActivate:[AuthGuard],canDeactivate:[CanDeactivateGuard] }
  ]
  
  }
]

@NgModule({
imports:[RouterModule.forRoot(appRoutes)],
exports:[RouterModule]
})
export class appRoutingModule{


}