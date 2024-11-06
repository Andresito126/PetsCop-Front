import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardUserComponent } from './card-user/card-user.component';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    CardUserComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    CardUserComponent
  ]
})
export class ViewUsersModule { }
