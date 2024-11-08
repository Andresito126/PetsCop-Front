import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserDataSerialization } from '../models/iuser-data-serialization';


@Injectable({
  providedIn: 'root'
})
export class UserConfigurationService {

  private _apiUrl = 'http://localhost:5432/';

  constructor(private _http: HttpClient) { }

    updateNormalUser(normalUser: IUserDataSerialization): Observable<IUserDataSerialization> {
                                                                      //falta el id             .idNormalUser 
      return this._http.put<IUserDataSerialization>(`${this._apiUrl}/edit_profile/${normalUser}`, normalUser);
  }
}
