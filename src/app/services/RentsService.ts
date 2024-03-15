import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CarForRent} from "../models/interfaces/carforrent";
import {RentRequest} from "../models/raquests/RentRequest";
import {RentResponse} from "../models/responses/RentResponse";


@Injectable({
  providedIn: 'root'
})
export class RentsService {

  private apiUrl = 'http://localhost:8080/rent/for-rent';

  constructor(private http: HttpClient) { }

  addRent(addedRent: RentRequest): Observable<RentResponse> {
    console.log("car rent service:",addedRent);
    return this.http.post<RentResponse>(`${this.apiUrl}`, addedRent);
  }


}
