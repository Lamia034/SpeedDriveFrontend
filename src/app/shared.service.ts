import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // isLoggedIn: boolean = false ;
  userName: string = '';
role: string = '';

  public isLoggedIn: boolean = false;
  // Getter for isLoggedIn
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Setter for isLoggedIn
  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
  setUserName(name: string) {

    // this.loginService.setUserName(userName);
    this.userName = name;
  }

  getUserName(){
    return this.userName;
  }
  setRole(role: string){
    this.role = role;
  }
  getRole(){
    return this.role;
  }
  constructor() {}
}
