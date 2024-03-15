import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../login/LoginRequest";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "../models/responses/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiBaseUrl = 'http://localhost:8080';

  private userName: string | null = null;

  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();


  setUserName(name: string | null): void {
    this.userNameSubject.next(name);
  }

  getUserName(): Observable<string | null> {
    return this.userName$;
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private http: HttpClient) {
    // this.checkAuthenticationStatus();

  }

  login(request: LoginRequest): Observable<AuthResponse> {
    // this.isLoggedInSubject.next(true);

    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/api/login`, request);

  }

  logout() {

    this.isLoggedInSubject.next(false);
  }

  // private checkAuthenticationStatus() {
  //
  //   const isLoggedIn = !!localStorage.getItem('token');
  //   this.isLoggedInSubject.next(isLoggedIn);
  // }
  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('authResponse');
  //   return !!token;
  // }
}

