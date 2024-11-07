import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormProfileUserComponent } from './form-profile-user/form-profile-user.component';
import { FormsModule } from '@angular/forms';
import { ProfileSettingsPageComponent } from './profile-settings-page/profile-settings-page.component';

@NgModule({
  declarations: [
    FormProfileUserComponent,
    ProfileSettingsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormProfileUserComponent,
    ProfileSettingsPageComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ProfileSettingsModule { }
