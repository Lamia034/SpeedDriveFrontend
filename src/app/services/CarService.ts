import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {CarForRent} from "../models/interfaces/carforrent";
import {CarForSell} from "../models/interfaces/carforsell";


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:8080/api/cars';

  private apiUrlImage = 'http://127.0.0.1:5000/upload';


  constructor(private http: HttpClient) { }

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
public getCarForRentById(carRentId: number): Observable<CarForRent>{
  return this.http.get<any>(`${this.apiUrl}/for-rent/id/${carRentId}`);

}
  getCarsForRentByAgency(page: number, size: number): Observable<CarForRent[]> {
    const agencyId = localStorage.getItem('agencyId');
    console.log("heere");
    return this.http.get<CarForRent[]>(`${this.apiUrl}/for-rent/${agencyId}?page=${page}&size=${size}`);
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ url: string }>(this.apiUrlImage, formData).pipe(
      map(response => response.url)
    );
  }
}
