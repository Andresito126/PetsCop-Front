import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserDataSerialization } from '../models/iuser-data-serialization';
import { IuserCredentialsSerialization } from '../models/iuser-credentials-serialization';


@Injectable({
  providedIn: 'root'
})
export class UserConfigurationService {

  private _apiUrl = 'http://127.0.0.1:5000/';

  constructor(private _http: HttpClient) { }

    getOwnProfile(id_user: number): Observable<IUserDataSerialization>{
      return this._http.get<IUserDataSerialization>(this._apiUrl + "get_normal_user_by_id/" + id_user);
    }

    getOwnCredentials(id_user: number): Observable<IuserCredentialsSerialization> {
      return this._http.get<IuserCredentialsSerialization>(this._apiUrl + "get_normal_user_by_id/" + id_user);
    }

    updateNormalUser(user: IUserDataSerialization): Observable<IUserDataSerialization> {
      return this._http.put<IUserDataSerialization>(`${this._apiUrl}edit_profile/${user.id_user_normally}`, user);
    }

    editPassword(credentials: IuserCredentialsSerialization): Observable<IuserCredentialsSerialization>{
      return this._http.put<IuserCredentialsSerialization>(this._apiUrl + "edit_password/" + credentials.id_user, credentials);
    }
}
