import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { IpostPreview } from '../models/ipost-preview';
import { IPostSerialization } from '../models/ipost-serialization';
import { IUserSerialization } from '../models/iuser-serialization';
import { ILocalServiceSerialization } from '../models/ilocal-service-serialization';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _url_mongo: string = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getRecentPosts(): Observable<IpostPreview[]>{
    return this._http.get<IpostPreview[]>(this._url_mongo + "/posts/getAllRecentPosts");
  }

  getOldPosts(): Observable<IpostPreview[]>{
    return this._http.get<IpostPreview[]>(this._url_mongo + "/posts/getAllOldPosts");
  }

  getRecentPostOfAType(type_post: string): Observable<IpostPreview[]>{
    return this._http.post<IpostPreview[]>(this._url_mongo + "/posts/getRecentPostsType/" + type_post, null);
  }

  getOldPostOfAType(type_post: string): Observable<IpostPreview[]>{
    return this._http.post<IpostPreview[]>(this._url_mongo + "/posts/getRecentPostsType/" + type_post, null);
  }

  getPostOfAnUser(id_user: number): Observable<IpostPreview[]>{
    return this._http.post<IpostPreview[]>(this._url_mongo + "/posts/getPostsUser/" + id_user, null);
  }

  getPhotosFromMongo(id_photo: string): Observable<any>{
    return this._http.get(this._url_mongo + "/drive/download/" + id_photo, {responseType: 'blob'});
  }

  getInformationPost(id_post: string | null): Observable<IPostSerialization> {
    return this._http.post<IPostSerialization>(`${this._url_mongo}/posts/getInformationPost/${id_post}`, {});
  }

  getInformationLocalService(id_user: number): Observable<ILocalServiceSerialization> {
    return this._http.post<ILocalServiceSerialization>(`${this._url_mongo}/posts/getNameAndPhotolocalService/${id_user}`, {});
  }
}
