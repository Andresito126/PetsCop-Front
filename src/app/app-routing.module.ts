import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credentials/login/login.component';
import { RegisterComponent } from './credentials/register/register.component';
import { ProfileSettingsPageComponent } from './users/profile-settings/profile-settings-page/profile-settings-page.component';
import { AdoptionPageComponent } from './users/add-post/pages/adoption-page/adoption-page.component';
import { LostPageComponent } from './users/add-post/pages/lost-page/lost-page.component';
import { ChooseUserComponent } from './credentials/choose-user/choose-user.component';
import { ViewProfileUserComponent } from './users/view-profile-user/view-profile-user.component';

const routes: Routes = [
  {path:'', component:ProfileSettingsPageComponent},
  { path: 'publicacion/perdida', component: LostPageComponent },
  { path: 'publicacion/adopcion', component: AdoptionPageComponent },
  {path:'usuario', component:ChooseUserComponent},
  {path:'usuario/registro', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'user_profile', component: ViewProfileUserComponent},
  {path:'configuracion/unormal', component:ProfileSettingsPageComponent}


  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
