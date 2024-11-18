import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsModule } from '../posts/posts.module';
import { HomePageComponent } from './home-page/home-page.component';





@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    PostsModule,
  ]
})
export class HomeModule { }
