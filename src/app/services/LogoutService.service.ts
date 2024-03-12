// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private router: Router) {}

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('authResponse');
    localStorage.removeItem('userId');
    this.clearLocalStorage();
    console.log('Navigating to login...');
    this.router.navigate(['/login']);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
  isAuthenticated(): boolean {
    const storedData = localStorage.getItem('authResponse');
    return !!storedData;
  }
}
