import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPostPageComponent } from './detail-post-page/detail-post-page.component';
import { CommentsComponent } from './comments/comments.component';
import { CardHomeComponent } from './shared/components-card/card-home/card-home.component';
import { HeaderFilterPostComponent } from './shared/components-card/header-filter-post/header-filter-post.component';
import { CardPostPageComponent } from './card-post-page/card-post-page.component';
import { HeaderCardComponent } from './shared/components-card/header-card/header-card.component';
import { InfoCardComponent } from './shared/components-card/info-card/info-card.component';




@NgModule({
  declarations: [
    DetailPostPageComponent,
    CommentsComponent,
    CardHomeComponent,
    HeaderFilterPostComponent,
    CardPostPageComponent,
    HeaderCardComponent,
    InfoCardComponent
 
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardPostPageComponent,
    HeaderFilterPostComponent
  ]
})
export class PostsModule { }
