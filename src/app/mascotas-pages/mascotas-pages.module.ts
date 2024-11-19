import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdidosPageComponent } from './perdidos-page/perdidos-page.component';
import { EncontradosPageComponent } from './encontrados-page/encontrados-page.component';
import { AdopcionPageComponent } from './adopcion-page/adopcion-page.component';
import { PostsModule } from '../posts/posts.module';



@NgModule({
  declarations: [
    PerdidosPageComponent,
    EncontradosPageComponent,
    AdopcionPageComponent,
  ],
  imports: [
    CommonModule,
    PostsModule,
  ],
  exports: [
    PerdidosPageComponent,
    EncontradosPageComponent,
    AdopcionPageComponent,
  ]
})
export class MascotasPagesModule { }
