import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostSerialization } from '../models/ipost-serialization';;
import { ILocalServiceSerialization } from '../models/ilocal-service-serialization';
import { IPostPreview } from '../models/ipost-preview';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private _http: HttpClient) { }

  private _url_mongo: string = 'http://localhost:3000';

  getRecentPosts(): Observable<IPostPreview[]>{
    return this._http.get<IPostPreview[]>(this._url_mongo + "/posts/getAllRecentPosts");
  }

  getOldPosts(): Observable<IPostPreview[]>{
    return this._http.get<IPostPreview[]>(this._url_mongo + "/posts/getAllOldPosts");
  }

  getRecentPostOfAType(type_post: string): Observable<IPostPreview[]>{
    return this._http.post<IPostPreview[]>(this._url_mongo + "/posts/getRecentPostsType/" + type_post, null);
  }

  getOldPostOfAType(type_post: string): Observable<IPostPreview[]>{
    return this._http.post<IPostPreview[]>(this._url_mongo + "/posts/getRecentPostsType/" + type_post, null);
  }

  getPostOfAnUser(id_user: number): Observable<IPostPreview[]>{
    return this._http.post<IPostPreview[]>(this._url_mongo + "/posts/getPostsUser/" + id_user, null);
  }

  getPhotosFromMongo(id_photo: string | undefined): Observable<any>{
    return this._http.get(this._url_mongo + "/drive/download/" + id_photo, {responseType: 'blob'});
  }

  getInformationPost(id_post: string | null): Observable<IPostSerialization> {
    return this._http.post<IPostSerialization>(`${this._url_mongo}/posts/getInformationPost/${id_post}`, {});
  }

  getInformationLocalService(id_user: number): Observable<ILocalServiceSerialization> {
    return this._http.post<ILocalServiceSerialization>(`${this._url_mongo}/posts/getNameAndPhotolocalService/${id_user}`, {});
  }

  pass_post_of_lost_to_found(id_post: string, gratitude: string): Observable<string>{
    return this._http.put<string>(`${this._url_mongo}/posts/updatePostLostPetToFoundPet/${id_post}`, {gratitude});
  }
}
