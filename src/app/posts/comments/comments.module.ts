import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { EditDeleteCommentComponent } from './edit-delete-comment/edit-delete-comment.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';



@NgModule({
  declarations: [
    CommentPageComponent,
    EditDeleteCommentComponent,
    WriteCommentComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommentPageComponent,
  ]
})
export class CommentsModule { }
