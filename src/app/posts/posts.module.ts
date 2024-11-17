import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPostPageComponent } from './detail-post-page/detail-post-page.component';
import { CommentsComponent } from './comments/comments.component';



@NgModule({
  declarations: [
    DetailPostPageComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
