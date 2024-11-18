import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardUserComponent } from './card-user/card-user.component';
import { ViewProfileUserComponent } from './view-profile-user/view-profile-user.component';

@NgModule({
  declarations: [
    CardUserComponent,
    ViewProfileUserComponent
  ],
  imports: [
    CommonModule,
    ProfileSettingsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ProfileSettingsModule,
    ViewProfileUserComponent,
  ]
})
export class UsersModule { }
