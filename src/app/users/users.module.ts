import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileSettingsModule
  ],
  exports: [
    ProfileSettingsModule
  ]
})
export class UsersModule { }
