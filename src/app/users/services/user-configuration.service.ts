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

    // Si el método requiere del token, no le agregues nada
    getOwnProfile(id_user: number): Observable<IUserDataSerialization>{
      return this._http.get<IUserDataSerialization>(this._apiUrl + "user_normally/get_by_id/" + id_user);
    }

    getOwnCredentials(id_user: number): Observable<IuserCredentialsSerialization> {
      return this._http.get<IuserCredentialsSerialization>(this._apiUrl + "user_normally/get_by_id/" + id_user);
    }

    getOwnProfilePhoto(id_photo: string): Observable<any>{
      return this._http.get(this._apiUrl + "drive/download/" + id_photo, {responseType: 'blob'});
    }

    uploadProfilePhoto(file: File): Observable<any>{
      const formData = new FormData();
      formData.append('file', file);

      return this._http.post(this._apiUrl + "drive/upload", formData);
    }

    updateNormalUser(user: IUserDataSerialization): Observable<IUserDataSerialization> {
      return this._http.put<IUserDataSerialization>(`${this._apiUrl}user_normally/edit_profile/${user.id_user_normally}`, user);
    }

    editPassword(credentials: IuserCredentialsSerialization): Observable<IuserCredentialsSerialization>{
      return this._http.put<IuserCredentialsSerialization>(this._apiUrl + "user_normally/edit_password/" + credentials.id_user, credentials);
    }
}
