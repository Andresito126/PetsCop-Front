import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { IRegistrerUserNormalSerialization } from '../models/iregistrer-user-normal-serialization';
import { IRegisterUserLocalServiceSerialization } from '../models/iregister-user-local-service-serialization';
import { IUserCredentialsSerialization } from '../models/iuser-credentials-serialization';
@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {

  private _apiUrl = 'http://127.0.0.1:5000/';
  constructor(private _http: HttpClient) { }

  //registro

  registerNormal(newUser: IRegistrerUserNormalSerialization): Observable<IRegistrerUserNormalSerialization>{
    return this._http.post<IRegistrerUserNormalSerialization>(this._apiUrl + "registerUser", newUser);
  };

  registerLocalService(newUser: IRegisterUserLocalServiceSerialization): Observable<IRegisterUserLocalServiceSerialization>{
    return this._http.post<IRegisterUserLocalServiceSerialization>(this._apiUrl + "jejejeje", newUser);
  };


  //login

  login(logUser: IUserCredentialsSerialization): Observable<IUserCredentialsSerialization>{
    return this._http.post<IUserCredentialsSerialization>(this._apiUrl + "login", logUser);
  };


}
