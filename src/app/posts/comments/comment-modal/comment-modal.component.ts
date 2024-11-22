import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css'
})
export class CommentModalComponent {
  @Input() showModal: boolean = false; 
  @Input() commentContent: string = '';
  @Output() commentSaved = new EventEmitter<string>(); 
  @Output() modalClosed = new EventEmitter<void>(); 

  saveComment() {
    this.commentSaved.emit(this.commentContent);
    this.closeModal();
  }

  closeModal() {
    this.modalClosed.emit();
    this.commentContent = ''; 
  }
}