import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LogoutService} from "../services/LogoutService.service";
import {LoginService} from "../services/LoginService";
import {Observable, Subscription} from "rxjs";
import {SharedService} from "../shared.service";
// import {AuthService} from "../services/AuthService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  // loggedInUserName: string | null = null;
  private userNameSubscription: Subscription | undefined;
  loggedInUserName: string | undefined;
  isLoggedIn: boolean = false;
  userRole: string ='';

  constructor(public sharedService: SharedService,private loginService: LoginService, private cdRef: ChangeDetectorRef, private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.userRole = this.sharedService.getRole();
    console.log("userRole:",this.userRole)
    this.isLoggedIn = this.sharedService.getIsLoggedIn();
    console.log("is logged in navbar:",this.isLoggedIn)
    if (this.isLoggedIn) {
      // If user is logged in, get and display the user's name
      this.loggedInUserName = this.sharedService.getUserName();
    }
    // this.userNameSubscription = this.loginService.getUserName().subscribe(name => {
    //   this.loggedInUserName = name;
    //   this.cdRef.detectChanges(); // Manually trigger change detection
    // });

    // console.log("is logged in navbar ",this.sharedService.isLoggedIn)
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    // if (this.userNameSubscription) {
    //   this.userNameSubscription.unsubscribe();
    // }
  }


  // ngOnInit(): void {
  //   this.loginService.isLoggedIn$.subscribe((isLoggedIn) => {
  //     this.isLoggedIn = isLoggedIn;
  //
  //     if (this.isLoggedIn) {
  //       this.userName = this.loginService.getUserName();
  //     } else {
  //       this.userName = null;
  //     }
  //
  //     this.cdRef.detectChanges();
  //   });
  //
  //
  // }

  title = 'SpeedDriveFrontend';
  isDropdownVisible = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout(): void {
    this.logoutService.logout();
  }
}


//   export class NavbarComponent  implements OnInit{
//
//
//   isLoggedIn = false;
//
//   userName: string | null = null;
//   constructor(private logoutService: LogoutService, private authService: AuthService) {}
//   ngOnInit() {
//     // Subscribe to the isLoggedIn$ observable to update the local property
//     this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
//       this.isLoggedIn = isLoggedIn;
//     });
//     this.userName = this.authService.getUserName();
//     console.log("userName:",this.userName);
//     }
//   title = 'SpeedDriveFrontend';
//   isDropdownVisible = false;
//
//   toggleDropdown() {
//     this.isDropdownVisible = !this.isDropdownVisible;
//   }
//
//
//
//   logout(): void {
//     this.logoutService.logout();
//   }
// }

