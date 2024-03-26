import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CarForRent} from "../models/interfaces/carforrent";
import {RentRequest} from "../models/raquests/RentRequest";
import {RentResponse} from "../models/responses/RentResponse";
import {Rent} from "../models/interfaces/Rent";


@Injectable({
  providedIn: 'root'
})
export class RentsService {

  private apiUrl = 'http://localhost:8080/rent';

  constructor(private http: HttpClient) { }

  addRent(addedRent: RentRequest): Observable<RentResponse> {
    console.log("car rent service:",addedRent);
    return this.http.post<RentResponse>(`${this.apiUrl}/for-rent`, addedRent);
  }

  getRentsByAgency(page: number, size: number): Observable<Rent[]> {
    const agencyId = localStorage.getItem('agencyId');
    console.log("heere");
    return this.http.get<Rent[]>(`${this.apiUrl}/${agencyId}?page=${page}&size=${size}`);
  }
  getRentsByClient(page: number, size: number): Observable<Rent[]> {
    const clientId = localStorage.getItem('clientId');
    console.log("heere");
    return this.http.get<Rent[]>(`${this.apiUrl}/by-client/${clientId}?page=${page}&size=${size}`);
  }


  deleteRent(clientId: string, carRentId: number | undefined): Observable<void> {
    console.log("giuh",clientId , carRentId)
    const url = `${this.apiUrl}?clientId=${clientId}&carRentId=${carRentId}`;
    return this.http.delete<void>(url);
  }

}
