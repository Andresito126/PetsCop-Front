import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILossPostSerialization } from '../models/iloss-post-serialization';
import { IAdoptionPostSerialization } from '../models/iadoption-post-serialization';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private urlAPI = 'http://localhost:3000';

  showColonies(): Observable<string[]> {
    return this.http.post<string[]>(`${this.urlAPI}/dipomex/29140`,{});
  }

  saveImagesDrive(images: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.urlAPI}/drive/uploadImages`,images);
  }

  createPostLostPet(postLostPet: ILossPostSerialization): Observable<void> {
    return this.http.post<void>(`${this.urlAPI}/posts/createPostLostPet`, postLostPet);
  }

  createPostAdoptionPet(postAdoptionPet: IAdoptionPostSerialization): Observable<void> {
    return this.http.post<void>(`${this.urlAPI}/posts/createPostPetAdoption`, postAdoptionPet);
  }
}
