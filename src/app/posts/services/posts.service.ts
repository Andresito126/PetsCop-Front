import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { IpostPreview } from '../models/ipost-preview';
import { IPostSerialization } from '../models/ipost-serialization';
import { IUserSerialization } from '../models/iuser-serialization';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _url_mongo: string = 'http://localhost:3000/';
  private _url_postgres: string = 'http://127.0.0.1:5000';

  constructor(private _http: HttpClient) { }

  getRecentPosts(): Observable<IpostPreview[]>{
    return this._http.get<IpostPreview[]>(this._url_mongo + "posts/getAllRecentPosts");
  }

  getOldPosts(): Observable<IpostPreview[]>{
    return this._http.get<IpostPreview[]>(this._url_mongo + "posts/getAllOldPosts");
  }

  getRecentPostOfAType(type_post: string): Observable<IpostPreview[]>{
    return this._http.post<IpostPreview[]>(this._url_mongo + "posts/getRecentPostsType/" + type_post, null);
  }

  getOldPostOfAType(type_post: string): Observable<IpostPreview[]>{
    return this._http.post<IpostPreview[]>(this._url_mongo + "posts/getRecentPostsType/" + type_post, null);
  }

  getPostOfAnUser(id_user: number): Observable<IpostPreview[]>{
    return this._http.post<IpostPreview[]>(this._url_mongo + "posts/getPostsUser/" + id_user, null);
  }

  getPhotosFromMongo(id_photo: string): Observable<any>{
    return this._http.get(this._url_mongo + "drive/download/" + id_photo, {responseType: 'blob'});
  }

  getInformationPost(id_post: string | null): Observable<IPostSerialization> {
    return this._http.post<IPostSerialization>(`${this._url_mongo}/getInformationPost/${id_post}`, {});
  }

  getInformationUser(user_id: number): Observable<IUserSerialization> {
    return this._http.get<IUserSerialization>(`${this._url_postgres}/getInformationPost/${user_id}`, {});
  }
}
