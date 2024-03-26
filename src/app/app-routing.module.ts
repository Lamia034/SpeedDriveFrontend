import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {FeedsComponent} from "./feeds/feeds.component";
import {AuthGuard} from "./authguard/AuthGuard";
import {CarDetailsComponent} from "./car-details/car-details.component";
import {RentsbyagencyComponent} from "./rentsbyagency/rentsbyagency.component";
import {MessagesComponent} from "./messages/messages.component";

const routes: Routes = [
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'dashboard' , component:DashboardComponent,canActivate: [AuthGuard] , data: { allowedRoles: ['AGENCY'] }},
  {path:'profile' , component:ProfileComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['CLIENT'] }},
  {path:'feeds' , component:FeedsComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['CLIENT','AGENCY'] }},
  {path:'rentsbyagency' , component:RentsbyagencyComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['AGENCY'] }},
  {path:'messages' , component:MessagesComponent},
  {path:'messages/:agencyId' , component:MessagesComponent},

  {path:'car-details/:carRentId' , component:CarDetailsComponent},

  {path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
