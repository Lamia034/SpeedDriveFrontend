
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check the authentication status when the service is initialized
    this.checkAuthenticationStatus();
  }

  login() {
    // Perform login logic
    // For simplicity, just set isLoggedIn to true
    this.isLoggedInSubject.next(true);
  }

  logout() {
    // Perform logout logic
    // For simplicity, just set isLoggedIn to false
    this.isLoggedInSubject.next(false);
  }

  private checkAuthenticationStatus() {
    // Perform a check to determine if the user is authenticated
    // Update the isLoggedInSubject accordingly
    // Example: Check if there is a token in localStorage
    const isLoggedIn = !!localStorage.getItem('token');
    this.isLoggedInSubject.next(isLoggedIn);
  }
}

// export class AuthService {
//   private userRolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
//   public userRoles$: Observable<string[]> = this.userRolesSubject.asObservable();
//
//   constructor(private jwtHelper: JwtHelperService,
//   @Inject(forwardRef(() => LoginService)) private loginService: LoginService,
//
//   ) {}
//
//   setRoles(token: string | null): void {
//     if (token && !this.jwtHelper.isTokenExpired(token)) {
//       const decodedToken = this.jwtHelper.decodeToken(token);
//       const userRoles = decodedToken?.role;
//       console.log("user role ",userRoles);
//       this.userRolesSubject.next(userRoles);
//     }
//   }
//
//   hasRole(role: string): Observable<boolean> {
//     return this.userRoles$.pipe(
//       map((userRoles: string | string[]) => {
//         if (Array.isArray(userRoles)) {
//           return userRoles.includes(role.toUpperCase());
//         }
//         return false;
//       })
//     );
//   }
// }
