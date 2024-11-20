import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credentials/login/login.component';
import { RegisterComponent } from './credentials/register/register.component';
import { ProfileSettingsPageComponent } from './users/profile-settings/profile-settings-page/profile-settings-page.component';
import { DetailPostPageComponent } from './posts/detail-post-page/detail-post-page.component';
import { ChooseUserComponent } from './credentials/choose-user/choose-user.component';
import { ViewProfileUserComponent } from './users/view-profile-user/view-profile-user.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { PerdidosPageComponent } from './mascotas-pages/perdidos-page/perdidos-page.component';
import { EncontradosPageComponent } from './mascotas-pages/encontrados-page/encontrados-page.component';
import { AdopcionPageComponent } from './mascotas-pages/adopcion-page/adopcion-page.component';


const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'perdidos', component: PerdidosPageComponent},
  {path:'encontrados', component: EncontradosPageComponent},
  {path:'adopcion', component: AdopcionPageComponent},
  {path:'usuario', component:ChooseUserComponent},
  {path:'usuario/registro', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'detallePost', component:DetailPostPageComponent},
  {path:'user/configuration', component:ProfileSettingsPageComponent},
  {path:'user_profile/:id_user', component: ViewProfileUserComponent},
  {path:'configuracion/unormal', component:ProfileSettingsPageComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
