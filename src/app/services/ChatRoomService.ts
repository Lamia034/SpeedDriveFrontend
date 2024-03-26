import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ChatRoom} from "../models/interfaces/ChatRoom";

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  private apiUrl = 'http://localhost:8080/api'; // Replace this with your actual backend API URL

  constructor(private http: HttpClient) {
  }

  getChatRoomsByLoggedOne(loggedOne: string): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(`${this.apiUrl}/chatrooms/${loggedOne}`);
  }
}
