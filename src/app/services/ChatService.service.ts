import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Message} from "../models/interfaces/Message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/messages';

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}`, message);
  }

  getMessagesByChatRoom(chatRoomId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${chatRoomId}`);
  }
}
