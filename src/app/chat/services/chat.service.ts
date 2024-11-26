import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IchatSerialization } from '../models/ichat-serialization';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  _url_api_mongo: string = 'https://petscopapi.integrador.xyz/chat/'

  constructor(private _http: HttpClient) { }

  init_chat(id_user_1: number , id_user_2: number): Observable<IchatSerialization>{
    return this._http.post<IchatSerialization>(this._url_api_mongo + "init", {id_user_1, id_user_2});
  }

  get_chats(id_user: number): Observable<IchatSerialization[]>{
    return this._http.get<IchatSerialization[]>(this._url_api_mongo + "get_by_user/" + id_user);
  }
}
