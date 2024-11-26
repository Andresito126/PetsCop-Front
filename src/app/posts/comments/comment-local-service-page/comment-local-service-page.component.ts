import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UserConfigurationService } from '../../../users/services/user-configuration.service';
import { PostsService } from '../../services/posts.service';
import { Icomments } from '../../models/icomments';
import { ICommentUser } from '../models/icomment-user';
import { IUpdateComment } from '../models/iupdate-comment';
import { ICreateComment } from '../models/icreate-comment';
import { CommentToLocalServiceService } from '../services/comment-to-local-service.service';

@Component({
  selector: 'app-comment-local-service-page',
  templateUrl: './comment-local-service-page.component.html',
  styleUrl: './comment-local-service-page.component.css'
})
export class CommentLocalServicePageComponent implements OnChanges {
  constructor(
    private serviceUser: UserConfigurationService,
    private servicePost: PostsService,
    private serviceComment: CommentToLocalServiceService
  ) {}

  // VARIABLES
  @Input() comments: Icomments[] | undefined;
  commentsUsers: ICommentUser[] = [];
  @Input() id_user: any;
  @Input() id_local_service: string = '';
  @Output() render = new EventEmitter<boolean>();

  // VARIABLES PARA EL MODAL
  showCommentModal: boolean = false;
  isEditing: boolean = false;
  currentCommentId: string | null = null;
  modalCommentContent: string = '';

  // MÉTODOS
  ngOnChanges(): void {
    if (this.comments?.length !== 0) {
      this.getCommentsLocalService();
    }
  }

  getCommentsLocalService(): void {
    this.comments?.forEach((comment) => {
      this.serviceUser.getTypeUser(comment.id_user).subscribe(
        (response) => {
          let commentUser: ICommentUser = {
            _id: '',
            creation_date: '',
            creation_time: '',
            response: '',
          };

          if (response.tipo_usuario === 'Normal') {
            this.serviceUser.getOwnProfile(comment.id_user).subscribe(
              (response) => {
                if (this.id_user == comment.id_user) {
                  commentUser.owns = true;
                }
                commentUser.name_last_name =
                  response.first_name + ' ' + response.last_name;
                commentUser._id = comment._id;
                commentUser.response = comment.response;
                const publicationDate = new Date(comment.creation_date);
                commentUser.creation_date = publicationDate
                  .toISOString()
                  .split('T')[0];
                commentUser.creation_time = publicationDate.toLocaleTimeString(
                  'en-US',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                  }
                );
                this.commentsUsers.push(commentUser);
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            this.servicePost
              .getInformationLocalService(comment.id_user)
              .subscribe(
                (response) => {
                  commentUser.name = response.name;
                  commentUser.response = comment.response;
                  const publicationDate = new Date(comment.creation_date);
                  commentUser.creation_date = publicationDate
                    .toISOString()
                    .split('T')[0];
                  commentUser.creation_time =
                    publicationDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    });
                  this.commentsUsers.push(commentUser);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  // MÉTODOS PARA EL MODAL

  openModal(commentId: string | null = null) {
    this.isEditing = commentId !== null;
    this.currentCommentId = commentId;
    this.modalCommentContent = this.isEditing
      ? this.commentsUsers.find((comment) => comment._id === commentId)
          ?.response || ''
      : '';
    this.showCommentModal = true;
  }

  closeModal(): void {
    this.showCommentModal = false;
  }


  // OTROS MÉTODOS

  saveComment(content: string) {
    if (this.isEditing && this.currentCommentId !== null) {
      // EDITAR
      let update_comment: IUpdateComment = {
        new_response: '',
        new_creation_date: new Date ()
      }

      const comment = this.commentsUsers.find(
        (comment) => comment._id === this.currentCommentId
      );
    
      if (comment) {
        update_comment.new_response = content;
        this.serviceComment.updateCommentToLocalService(this.id_local_service, comment._id, update_comment).subscribe(
          (response) => {
            alert("Comentario actualizado")
            this.commentsUsers = [];
            this.emitter();
          },
          (err) => {
            console.log(err)
          }
        );
      }

    } else {
      // AGREGAR NUEVO
      let new_comment: ICreateComment = {
        response: content,
        creation_date: new Date()
      }

      this.serviceComment.createCommentToLocalService(this.id_local_service, this.id_user, new_comment)
        .subscribe(
          (response) => {
            this.commentsUsers = [];
            this.emitter();
          },
          (err) => {
            console.log(err);
          }
        );
    }
    this.closeModal();
  }

  emitter(): void {
    this.render.emit(true);
  }

  // ELIMINAR COMENTARIO
  deleteComment(id: string) {
    this.serviceComment.deleteCommentToLocalService(this.id_local_service, id).subscribe(
      (response) => {
        alert('Comentario eliminado');
      },
      (err) => {
        console.log(err);
      }
    );
    
    this.commentsUsers = this.commentsUsers.filter(comment => comment._id !== id);
  }
}
