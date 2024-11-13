import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credentials/login/login.component';
import { RegisterComponent } from './credentials/register/register.component';
import { ProfileSettingsPageComponent } from './users/profile-settings/profile-settings-page/profile-settings-page.component';
import { ChooseUserComponent } from './credentials/choose-user/choose-user.component';
const routes: Routes = [
  {path:'registro', component:ChooseUserComponent},
  {path:'login', component:LoginComponent},
  {path:'', component:ProfileSettingsPageComponent}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
