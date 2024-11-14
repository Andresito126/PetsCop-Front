import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credentials/login/login.component';
import { RegisterComponent } from './credentials/register/register.component';
import { ProfileSettingsPageComponent } from './users/profile-settings/profile-settings-page/profile-settings-page.component';
import { CardHomeComponent } from './home/shared/card-home/card-home.component';
const routes: Routes = [
  {path:'registro', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'user/configuration', component:ProfileSettingsPageComponent},
  {path:'', component:CardHomeComponent}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
