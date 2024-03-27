import {forwardRef, Inject, Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {LoginService} from "../services/LoginService";
import {SharedService} from "../shared.service";
// import {AuthService} from "../services/AuthService";



@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private sharedService: SharedService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('isLoggedIn in AuthGuard:', this.sharedService.isLoggedIn);
this.sharedService.isLoggedIn;
    console.log('canactivate is called');
    const allowedRoles = route.data['allowedRoles'];
    const token = localStorage.getItem('speedDrive_authResponse');
    console.log('AuthResponse from localStorage:', token);
this.setRoles(token);
    const userRoles = this.sharedService.getRole();
    console.log('User roles:', userRoles);

    if (userRoles && allowedRoles.some((role: string) => userRoles.includes(role.toUpperCase()))) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }

  setRoles(token: string | null): void {
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      const userRoles = decodedToken?.role;
      // console.log("user role ", userRoles);
      this.sharedService.setRole(userRoles);

      const agencyId = decodedToken?.agencyId;
      // console.log("agency id extracted:",agencyId);
      localStorage.setItem('agencyId', agencyId);
      // console.log("agency id stored:",localStorage);

      const clientId = decodedToken?.clientId;
      // console.log("client id extracted:",clientId);
      localStorage.setItem('clientId', clientId);
      // console.log("client id stored:",localStorage);

      const userName = decodedToken?.name;
      // console.log("user name ", userName);


      this.sharedService.setUserName(userName);
    }}

}


