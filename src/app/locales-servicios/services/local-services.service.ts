import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IlocalServicesSerialization } from '../models/ilocal-services-serialization';
import { Observable } from 'rxjs';
import { IUserCredentialsSerialization } from '../../credentials/models/iuser-credentials-serialization';

@Injectable({
  providedIn: 'root'
})
export class LocalServicesService {

  _url_mongo: string = "http://localhost:3000/";
  _url_pg: string = "http://127.0.0.1:5000/users/";

  constructor(private _http: HttpClient) { }

  get_local_services_by_id(_id: string): Observable<IlocalServicesSerialization>{
    return this._http.post<IlocalServicesSerialization>(this._url_mongo + "locals_services/getInformationLocalService/" + _id, null);
  }

  get_local_services_by_id_user(id_user: number): Observable<IlocalServicesSerialization>{
    return this._http.get<IlocalServicesSerialization>(this._url_mongo + "locals_services/get_by_id_user/" + id_user);
  }

  get_credentials_of_local_services(id: number): Observable<IUserCredentialsSerialization>{
    return this._http.get<IUserCredentialsSerialization>(this._url_pg + "get_one_user/" + id);
  }

  edit_local_services(local_services: IlocalServicesSerialization): Observable<IlocalServicesSerialization>{
    return this._http.put<IlocalServicesSerialization>(this._url_mongo + "locals_services/updateInformationLocalService/" + local_services._id, local_services);
  }

  edit_password_local_services(credentials: IUserCredentialsSerialization): Observable<IUserCredentialsSerialization>{
    return this._http.put<IUserCredentialsSerialization>(this._url_pg + "edit_password/" + credentials.id_user, credentials);
  }

  get_photo_of_local_services(id_photo: string): Observable<any>{
    return this._http.get(this._url_mongo + "drive/download/" + id_photo, { responseType: 'blob' });
  }

  post_photo_into_local_services(images: FormData): Observable<string[]>{
    return this._http.post<string[]>(this._url_mongo + "drive/uploadImages", images);
  }
}
