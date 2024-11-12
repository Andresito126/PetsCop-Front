import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {

  private httpClient= inject(HttpClient);
  private _apiUrl = 'http://localhost:3000';
  constructor() { }

  register(formValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this._apiUrl}/registro`,formValue)
    )
  };

  login(formValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this._apiUrl}/login`,formValue)
    )
  };


}
