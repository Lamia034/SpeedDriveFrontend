
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../services/RegisterService";
import {Role} from "../models/raquests/RegisterRequest";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // @ts-ignore
  // registerRequest: RegisterRequest = new RegisterRequest();
  registerRequest = {


    name : '',
    email:'',
    password:'',
    nationality:'',

    role:''
  }
  constructor(private registrationService: RegisterService, private router: Router) {}

  register(): void {
    // @ts-ignore
    this.registrationService.register(this.registerRequest)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        console.error('Registration failed:', error);
      });
  }
}
