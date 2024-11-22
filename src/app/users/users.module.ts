import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { FormsModule } from '@angular/forms';
import { AddPostModule } from './add-post/add-post.module';
import { HttpClientModule } from '@angular/common/http';
import { CardUserComponent } from './card-user/card-user.component';
import { ViewProfileUserComponent } from './view-profile-user/view-profile-user.component';
import { PostsModule } from '../posts/posts.module';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    CardUserComponent,
    ViewProfileUserComponent
  ],

  imports: [
    CommonModule,
    ProfileSettingsModule,
    FormsModule,
    AddPostModule,
    HttpClientModule,
    PostsModule,
    RouterLink,
  ],
  exports: [
    ProfileSettingsModule,
    ViewProfileUserComponent,
  ]
})
export class UsersModule { }
