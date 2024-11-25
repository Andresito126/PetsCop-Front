import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocalService } from '../../../../local-services/models/ilocal-service-serialization';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {

  constructor(private http: HttpClient) { }

  private _url_mongo: string = 'http://localhost:3000';

  getInformationLocalService(id_user: number): Observable<ILocalService> {
    return this.http.get<ILocalService>(`${this._url_mongo}/locals_services/get_by_id_user/${id_user}`);
  }
}
