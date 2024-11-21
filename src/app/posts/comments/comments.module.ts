import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { EditDeleteCommentComponent } from './edit-delete-comment/edit-delete-comment.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CommentPageComponent,
    EditDeleteCommentComponent,
    WriteCommentComponent,
    CommentModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CommentPageComponent,
  ]
})
export class CommentsModule { }
