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
  private userRolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public userRoles$: Observable<string[]> = this.userRolesSubject.asObservable();

  private lastRoles: string[] = [];

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private loginService: LoginService,
    private sharedService: SharedService
    // private authService: AuthService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('isLoggedIn in AuthGuard:', this.sharedService.isLoggedIn);
this.sharedService.isLoggedIn;
    console.log('canActivate is called');
    const allowedRoles = route.data['allowedRoles'];
    const token = localStorage.getItem('speedDrive_authResponse');
    console.log('AuthResponse from localStorage:', token);
this.setRoles(token);
    // Get user's roles from the SharedService
    const userRoles = this.sharedService.getRole();
    console.log('User roles:', userRoles);

    // Check if user has any of the allowed roles
    if (userRoles && allowedRoles.some((role: string) => userRoles.includes(role.toUpperCase()))) {
      console.log('User has allowed role');
      return true; // User has the required role
    } else {
      console.log('Redirecting to login');
      return this.router.createUrlTree(['/login']); // Redirect to login page
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
    //   canActivate(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //     console.log('canActivate is called');
    //     const allowedRoles = route.data['allowedRoles'];
    //     if (this.sharedService.getRole() && allowedRoles.some((role: string) => this.sharedService.getRole().some((userRole: UserRole) => userRole.authority === role.toUpperCase()))) {
    //       console.log('User has allowed role');
    //       return true;
    //     }
    //
    //
    //     console.log('Redirecting to login');
    //     return this.router.createUrlTree(['/login']);
    //   }
    //





// // console.log("user name in auth gard after set :",this.loginService.getUserName());
//       if (!this.areRolesEqual(userRoles, this.lastRoles)) {
//
//         this.userRolesSubject.next(userRoles);
//         this.lastRoles = userRoles;
//       }
//     }
//   }


  // hasRole(role: string): Observable<boolean> {
  //   return this.userRoles$.pipe(
  //     map((userRoles: string | string[]) => {
  //       if (Array.isArray(userRoles)) {
  //         return userRoles.includes(role.toUpperCase());
  //       }
  //       return false;
  //     })
  //   );
  // }
  //
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   console.log('canActivate is called');
  //   const token = localStorage.getItem('authResponse');
  //   console.log('AuthResponse from localStorage:', token);
  //
  //   this.setRoles(token);
  //
  //   return this.hasRole('AGENCY').pipe(
  //     tap(hasAgencyRole => {
  //       if (hasAgencyRole) {
  //         console.log('User has AGENCY role. Redirecting to dashboard.');
  //         this.router.navigate(['/dashboard']);
  //       } else {
  //         this.hasRole('CLIENT').subscribe(hasClientRole => {
  //           if (hasClientRole) {
  //             console.log('User has CLIENT role. Redirecting to profile.');
  //             this.router.navigate(['/profile']);
  //           } else {
  //             console.log('User does not have AGENCY or CLIENT role. Redirecting to login.');
  //             this.router.navigate(['/login']);
  //           }
  //         });
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error checking roles:', error);
  //       return of(false);
  //     })
  //   );
  // }
  //
  // private areRolesEqual(roles1: string[] | undefined, roles2: string[] | undefined): boolean {
  //   if (!roles1 || !roles2) {
  //     return roles1 === roles2;
  //   }
  //
  //   return roles1.length === roles2.length && roles1.every((role, index) => role === roles2[index]);
  // }
}


