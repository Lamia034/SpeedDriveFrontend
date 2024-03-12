import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/raquests/RegisterRequest";
import {AuthResponse} from "../models/responses/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/api/register`, request);
  }
}
