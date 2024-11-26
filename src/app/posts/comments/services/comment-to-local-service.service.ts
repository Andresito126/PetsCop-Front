import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateComment } from '../models/icreate-comment';
import { IUpdateComment } from '../models/iupdate-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentToLocalServiceService {

  constructor(private http: HttpClient) { }

  private url: string = 'http://localhost:3000';

  createCommentToLocalService(id_local_service: string, id_user: number, comment: ICreateComment): Observable<void> {
    return this.http.put<void> (`${this.url}/commentsToLocalService/createCommentToLocalService/${id_local_service}/${id_user}`, comment);
  }

  updateCommentToLocalService(id_local_service: string, id_comment: string, new_comment: IUpdateComment): Observable<void> {
    return this.http.put<void> (`${this.url}/commentsToLocalService/updateCommentUser/${id_local_service}/${id_comment}`, new_comment);
  }

  deleteCommentToLocalService(id_local_service: string, id_comment: string): Observable<void> {
    return this.http.delete<void> (`${this.url}/commentsToLocalService/deleteCommentUserToLocalService/${id_local_service}/${id_comment}`);
  }
}
