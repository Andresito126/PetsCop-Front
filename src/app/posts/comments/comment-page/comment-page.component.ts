import { Component } from '@angular/core';
import { IComment } from '../models/i-comment';
@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.css'
})
export class CommentPageComponent {

  //variables

  //V para el modal
  showCommentModal: boolean = false; 
  isEditing: boolean = false; 
  currentCommentId: number | null = null; 
  modalCommentContent: string = ''; 


  //MÉTODOS

  
  comments: IComment[] = [
    {
      id: 1,
      username: 'Charlyick',
      avatarUrl: 'https://pagedone.io/asset/uploads/1710225753.png',
      content: 'ta perro',
      theDate: new Date(),
      autor: true
    },
    {
      id: 2,
      username: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      content: 'me guto.',
      theDate: new Date(),
      autor: false
    }
  ];

  //M para el modal
  openModal(commentId: number | null = null) {
    this.isEditing = commentId !== null;
    this.currentCommentId = commentId;
    this.modalCommentContent = this.isEditing
      ? this.comments.find(comment => comment.id === commentId)?.content || ''
      : '';
    this.showCommentModal = true;
  }

  closeModal() {
    this.showCommentModal = false;
  }

  //otros M de comentarios

  saveComment(content: string) {
    if (this.isEditing && this.currentCommentId !== null) {
      // editar
      const comment = this.comments.find(comment => comment.id === this.currentCommentId);
      if (comment) comment.content = content;
    } else {
      // agregar nuevo 
      this.comments.push({
        id: Date.now(),
        username: 'Usuario Actual',
        avatarUrl: 'https://example.com/avatar.jpg',
        content,
        theDate: new Date(),
        autor: true
      });
    }
    this.closeModal();
  }

  // eliminar un comentario p
  deleteComment(id: number) {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }


}
