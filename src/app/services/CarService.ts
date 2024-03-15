import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CarForRent} from "../models/interfaces/carforrent";
import {CarForSell} from "../models/interfaces/carforsell";


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) { }

//   addCarForRent(carForRent: CarForRent): Observable<CarForRent> {
//     console.log("car for rent",carForRent);
//     // return this.http.post<CarForRent>(`${this.apiUrl}/for-rent`, carForRent);
//     const loggedInAgencyId = localStorage.getItem('agencyId') || ''; // Replace this with your actual implementation to get the agency ID
//     const requestPayload = { carForRent, agencyId: loggedInAgencyId };
// console.log("request payload",requestPayload);
//     return this.http.post<CarForRent>(`${this.apiUrl}/for-rent`, requestPayload);
//   }

  // addCarForRent(carForRent: FormData): Observable<CarForRent> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data'); // Set the content type to multipart/form-data
  //
  //   return this.http.post<CarForRent>(`${this.apiUrl}/for-rent`, carForRent, { headers });
  // }
  // addCarForRent(formData: FormData): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/for-rent`, formData);
  // }

  addCarForRent(carForRent: CarForRent): Observable<CarForRent> {
    console.log("car rent service:",carForRent);
    return this.http.post<CarForRent>(`${this.apiUrl}/for-rent`, carForRent);
  }

  updateCarForRent(carRentId: number, updatedCarForRent: any): Observable<CarForRent> {
    const url = `${this.apiUrl}/for-rent/${carRentId}`;
    console.log(updatedCarForRent);
    return this.http.put<CarForRent>(url, updatedCarForRent);
  }

  public deleteCarForRent(carRentId: number): Observable<any> {
    console.log('Deleting car with ID:', carRentId);
    return this.http.delete<any>(`${this.apiUrl}/for-rent/${carRentId}`);
  }

  // addCarForSell(carForSell: CarForSell): Observable<CarForSell> {
  //   return this.http.post<CarForSell>(`${this.apiUrl}/for-sell`, carForSell);
  // }

  // getAllCarsForRent(): Observable<CarForRent[]> {
  //   return this.http.get<CarForRent[]>(`${this.apiUrl}/for-rent`);
  // }

  getCarsForRentByAgency(page: number, size: number): Observable<CarForRent[]> {
    const agencyId = localStorage.getItem('agencyId');
    console.log("heere");
    return this.http.get<CarForRent[]>(`${this.apiUrl}/for-rent/${agencyId}?page=${page}&size=${size}`);
  }

  // getAllCarsForSell(): Observable<CarForSell[]> {
  //   return this.http.get<CarForSell[]>(`${this.apiUrl}/for-sell`);
  // }

}
