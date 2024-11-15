import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { FormsModule } from '@angular/forms';
import { AddPostModule } from './add-post/add-post.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileSettingsModule,
    FormsModule,
    AddPostModule,
    HttpClientModule
  ],
  exports: [
    ProfileSettingsModule
  ]
})
export class UsersModule { }
