import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LogoutService} from "../services/LogoutService.service";
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

  export class NavbarComponent  implements OnInit{


  isLoggedIn = false;


  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to update the local property
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  title = 'SpeedDriveFrontend';
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  constructor(private logoutService: LogoutService, private authService: AuthService) {}

  logout(): void {
    this.logoutService.logout();
  }
}

