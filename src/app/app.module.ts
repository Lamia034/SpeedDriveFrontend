import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedsComponent } from './feeds/feeds.component';
import {JwtModule} from "@auth0/angular-jwt";
import {AuthResponse} from "./models/responses/AuthResponse";
import { CarsComponent } from './cars/cars.component';
import {LoginService} from "./services/LoginService";
import {AuthInterceptor} from "./interceptor/AuthInterceptor";
import { CarDetailsComponent } from './car-details/car-details.component';
import {NgOptimizedImage} from "@angular/common";
// import {AuthService} from "./services/AuthService";
export function tokenGetter() {
  const authResponseJson = localStorage.getItem('authResponse');

  if (authResponseJson) {
    const authResponse: AuthResponse = JSON.parse(authResponseJson);
    return authResponse.token || null;
  }

  return null;
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    FeedsComponent,
    CarsComponent,
    CarDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
