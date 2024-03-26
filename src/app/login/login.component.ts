import {Component, Injectable} from '@angular/core';
import {AuthResponse} from "../models/responses/AuthResponse";
import {LoginService} from "../services/LoginService";
import {Router} from "@angular/router";
import {AuthGuard} from "../authguard/AuthGuard";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// ...

@Injectable({
  providedIn: 'root'
})
export class LoginComponent {


  // @ts-ignore
  // registerRequest: RegisterRequest = new RegisterRequest();
  loginRequest = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService,
              private authGuard: AuthGuard,
              private sharedService: SharedService,
              private router: Router) {}

  login(): void {
    this.loginService.login(this.loginRequest)
      .subscribe(
        (authResponse: AuthResponse) => {
          // this.sharedService.isLoggedIn = true;
          console.log("logged in login comp:",this.sharedService.isLoggedIn)
          this.sharedService.setIsLoggedIn(true);
          // console.log('Login successful:', authResponse);
          localStorage.setItem('speedDrive_authResponse', authResponse.token);

          this.authGuard.setRoles(authResponse.token);

          const token = authResponse.token;
          const myAppKey = 'speedDrive_authResponse';
          localStorage.setItem(myAppKey, authResponse.token);
          console.log('Local Storage:', localStorage);
// this.authGuard.hasRole(authResponse.token);
          this.router.navigate(['/feeds']);
        }, error => {
          console.error('Login failed:', error);
        });
  }

}

