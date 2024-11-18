import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { IRegistrerUserNormalSerialization } from '../models/iregistrer-user-normal-serialization';
import { IRegisterUserLocalServiceSerialization } from '../models/iregister-user-local-service-serialization';
import { IUserCredentialsSerialization } from '../models/iuser-credentials-serialization';
import { IloginUserSerialization } from '../models/ilogin-user-serialization';
import { IInformationAccessSerialization } from '../models/iinformation-access-serialization';
import { IRegisterUserSerialization } from '../models/iregister-user-serialization';
import { IResponseAddingUserSerialization } from '../models/iresponse-adding-user-serialization';
@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {

  constructor(private _http: HttpClient) { }

  private _apiUrl = 'http://127.0.0.1:5000';
  private _apiURLMONGO = 'http://localhost:3000';

  // Registrar un usuario normal
  // Si el método no requiere de un token, agregale el skipAuth
  registerNormalUser(newUser: IRegistrerUserNormalSerialization): Observable<IRegistrerUserNormalSerialization>{
    return this._http.post<IRegistrerUserNormalSerialization>(this._apiUrl + '/user_normally/register', newUser, {
      headers: new HttpHeaders({ 'skipAuth': 'true' })
    });
  };

  // Registrar a un usuario de tipo local o servicio
  registerLocalServiceAsUser(newUserTypeLocalService: IRegisterUserSerialization): Observable <IResponseAddingUserSerialization> {
    return this._http.post<IResponseAddingUserSerialization>(this._apiUrl + '/users/register', newUserTypeLocalService, {
      headers: new HttpHeaders({ 'skipAuth': 'true' })
    });
  }

  // Registrar a un local o servicio
  registerLocalService(newLocalService: IRegisterUserLocalServiceSerialization): Observable<void> {
    return this._http.post<void>(this._apiURLMONGO + '/locals_services/registerLocalService', newLocalService);
  }

  // Guardar imágen
  saveImage(form_data: FormData): Observable<any> {
    return this._http.post<any>(this._apiUrl + '/drive/upload', form_data)
  }

  // registerLocalService(newUser: IRegisterUserLocalServiceSerialization): Observable<IRegisterUserLocalServiceSerialization>{
  //   return this._http.post<IRegisterUserLocalServiceSerialization>(this._apiUrl + "jejejeje", newUser);
  // };


  //login

  login(logUser: IloginUserSerialization): Observable<IInformationAccessSerialization>{
    return this._http.post<IInformationAccessSerialization>(this._apiUrl + "/users/login", logUser, {
      headers: new HttpHeaders({ 'skipAuth': 'true' })
    });
  };

  getColognes(cp: number): Observable<string[]>{
    return this._http.post<string[]>(this._apiURLMONGO + "/dipomex/" + cp, null);
  }

  // EJEMPLO
  // registerUser(userData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, userData, {
  //     headers: new HttpHeaders({ 'skipAuth': 'true' }) // Aquí agregas la bandera personalizada
  //   });
  // }




}
