
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//
//   private userName: string | null = null;
//
//   setUserName(name: string): void {
//     this.userName = name;
//     console.log("user name in au service set:",this.userName);
//   }
//
//   getUserName(): string  {
//     console.log("user name in au service get:",this.userName);
//     return <string>this.userName;
//   }
//   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//
//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//
//   constructor() {
//     this.checkAuthenticationStatus();
//   }
//
//   login() {
//
//     this.isLoggedInSubject.next(true);
//   }
//
//   logout() {
//
//     this.isLoggedInSubject.next(false);
//   }
//
//   private checkAuthenticationStatus() {
//
//     const isLoggedIn = !!localStorage.getItem('token');
//     this.isLoggedInSubject.next(isLoggedIn);
//   }
// }

