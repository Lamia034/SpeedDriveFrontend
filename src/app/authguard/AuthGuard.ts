import {forwardRef, Inject, Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {LoginService} from "../services/LoginService";



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
  ) {}
  setRoles(token: string | null): void {
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      const userRoles = decodedToken?.role;
      console.log("user role ", userRoles);
      const agencyId = decodedToken?.agencyId;
      console.log("agency id extracted:",agencyId);
      localStorage.setItem('agencyId', agencyId);
      console.log("agency id stored:",localStorage);

      if (!this.areRolesEqual(userRoles, this.lastRoles)) {

        this.userRolesSubject.next(userRoles);
        this.lastRoles = userRoles;
      }
    }
  }


  hasRole(role: string): Observable<boolean> {
    return this.userRoles$.pipe(
      map((userRoles: string | string[]) => {
        if (Array.isArray(userRoles)) {
          return userRoles.includes(role.toUpperCase());
        }
        return false;
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivate is called');
    const token = localStorage.getItem('authResponse');
    console.log('AuthResponse from localStorage:', token);

    this.setRoles(token);

    return this.hasRole('AGENCY').pipe(
      tap(hasAgencyRole => {
        if (hasAgencyRole) {
          console.log('User has AGENCY role. Redirecting to dashboard.');
          this.router.navigate(['/dashboard']);
        } else {
          this.hasRole('CLIENT').subscribe(hasClientRole => {
            if (hasClientRole) {
              console.log('User has CLIENT role. Redirecting to profile.');
              this.router.navigate(['/profile']);
            } else {
              console.log('User does not have AGENCY or CLIENT role. Redirecting to login.');
              this.router.navigate(['/login']);
            }
          });
        }
      }),
      catchError(error => {
        console.error('Error checking roles:', error);
        return of(false);
      })
    );
  }

  private areRolesEqual(roles1: string[] | undefined, roles2: string[] | undefined): boolean {
    if (!roles1 || !roles2) {
      return roles1 === roles2;
    }

    return roles1.length === roles2.length && roles1.every((role, index) => role === roles2[index]);
  }
}


