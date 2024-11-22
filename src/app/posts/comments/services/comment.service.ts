import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateComment } from '../models/icreate-comment';
import { IUpdateComment } from '../models/iupdate-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private url: string = 'http://localhost:3000';

  createCommentToPost(id_post: string, id_user: number, new_comment: ICreateComment): Observable<void> {
    return this.http.put<void> (`${this.url}/comments/createCommentToPost/${id_post}/${id_user}`, new_comment);
  }

  updateCommentToPost(id_post: string, id_comment: string, new_comment: IUpdateComment): Observable<void> {
    return this.http.put<void> (`${this.url}/comments/updateCommentUser/${id_post}/${id_comment}`, new_comment);
  }

  deleteCommentToPost(id_post: string, id_comment: string): Observable<void> {
    return this.http.delete<void> (`${this.url}/comments/deleteCommentUserToPost/${id_post}/${id_comment}`);
  }

}
