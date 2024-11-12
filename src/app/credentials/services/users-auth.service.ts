import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { IRegistrerUserSerialization } from '../models/iregistrer-user-serialization';
import { IUserCredentialsSerialization } from '../models/iuser-credentials-serialization';
@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {

  private _apiUrl = 'http://127.0.0.1:5000/';
  constructor(private _http: HttpClient) { }

  register(newUser: IRegistrerUserSerialization): Observable<IRegistrerUserSerialization>{
    return this._http.post<IRegistrerUserSerialization>(this._apiUrl + "registerUser", newUser);
  };

  login(logUser: IUserCredentialsSerialization): Observable<IUserCredentialsSerialization>{
    return this._http.post<IUserCredentialsSerialization>(this._apiUrl + "login", logUser);
  };


}
