import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {FeedsComponent} from "./feeds/feeds.component";
import {AuthGuard} from "./authguard/AuthGuard";
import {CarDetailsComponent} from "./car-details/car-details.component";

const routes: Routes = [
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'dashboard' , component:DashboardComponent},
  {path:'profile' , component:ProfileComponent},
  {path:'feeds' , component:FeedsComponent},
  {path:'car-details/:carRentId' , component:CarDetailsComponent},

  {path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
