import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPostPageComponent } from './detail-post-page/detail-post-page.component';
import { CommentsComponent } from './comments/comments.component';
import { HeaderFilterPostComponent } from './shared/components-card/header-filter-post/header-filter-post.component';
import { CardPostPageComponent } from './card-post-page/card-post-page.component';
import { HeaderCardComponent } from './shared/components-card/header-card/header-card.component';
import { InfoCardComponent } from './shared/components-card/info-card/info-card.component';

import { ImageGalleryComponent } from './shared/components-detail/image-gallery/image-gallery.component';
import { NameStatusComponent } from './shared/components-detail/name-status/name-status.component';
import { BasicDataComponent } from './shared/components-detail/basic-data/basic-data.component';
import { PetDescriptionComponent } from './shared/components-detail/pet-description/pet-description.component';
import { LostInfoCardsComponent } from './shared/components-detail/lost-info-cards/lost-info-cards.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    DetailPostPageComponent,
    CommentsComponent,
    HeaderFilterPostComponent,
    CardPostPageComponent,
    HeaderCardComponent,
    InfoCardComponent,
    ImageGalleryComponent,
    NameStatusComponent,
    BasicDataComponent,
    PetDescriptionComponent,
    LostInfoCardsComponent
 
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CardPostPageComponent,
    HeaderFilterPostComponent,
  
  ]
})
export class PostsModule { }
