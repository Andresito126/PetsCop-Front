import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { LocalsPageComponent } from './pages/locals-page/locals-page.component';
import { PostsModule } from '../posts/posts.module';



@NgModule({
  declarations: [
    ServicesPageComponent,
    LocalsPageComponent
  ],
  imports: [
    CommonModule,
    PostsModule
  ]
})
export class LocalServicesModule { }
