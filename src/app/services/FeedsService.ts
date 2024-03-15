import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CarForRent} from "../models/interfaces/carforrent";
import {CarForSell} from "../models/interfaces/carforsell";
import {CarForRentResponse} from "../models/responses/CarForRentResponse";


@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) {
  }

getAllCarsForRent(page: number, size: number): Observable<CarForRent[]> {
  return this.http.get<CarForRent[]>(`${this.apiUrl}/for-rent?page=${page}&size=${size}`);
}
  public getCarForRentById(carRentId: number): Observable<CarForRentResponse> {
    console.log('fetching car rent with ID:', carRentId);
    return this.http.get<CarForRentResponse>(`${this.apiUrl}/for-rent/id/${carRentId}`);
  }
}
