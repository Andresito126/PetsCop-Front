import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalsPageComponent } from './pages/locals-page/locals-page.component';
import { PostsModule } from '../posts/posts.module';



@NgModule({
  declarations: [
    LocalsPageComponent,
  ],
  imports: [
    CommonModule,
    PostsModule
  ]
})
export class LocalServicesModule { }
