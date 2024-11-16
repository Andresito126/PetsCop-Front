import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHomeComponent } from './shared/card-home/card-home.component';
import { DetailPostPageComponent } from './detail-post-page/detail-post-page.component';
import { CommentsComponent } from './shared/comments/comments.component';




@NgModule({
  declarations: [
    CardHomeComponent,
    DetailPostPageComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
