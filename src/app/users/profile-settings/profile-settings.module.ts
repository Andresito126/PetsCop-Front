import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormProfileUserComponent } from './form-profile-user/form-profile-user.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormProfileUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormProfileUserComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ProfileSettingsModule { }
