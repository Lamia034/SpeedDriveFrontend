// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  isLoggedIn: boolean = true;

  constructor(private router: Router) {}

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('authResponse');
    localStorage.removeItem('clientId' && 'agencyId');
    this.clearLocalStorage();
    this.router.navigate(['/login']);
    console.log('ag',localStorage.getItem('clientId'));
    console.log('c',localStorage.getItem('agencyId'));
    this.isLoggedIn = false; // Set login status to false

  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
  isAuthenticated(): boolean {
    const storedData = localStorage.getItem('authResponse');
    return !!storedData;
  }
}
