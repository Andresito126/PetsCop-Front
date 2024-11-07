import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileSettingsModule,
    FormsModule
  ],
  exports: [
    ProfileSettingsModule
  ]
})
export class UsersModule { }
