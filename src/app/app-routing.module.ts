import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credentials/login/login.component';
import { RegisterComponent } from './credentials/register/register.component';
import { ProfileSettingsPageComponent } from './users/profile-settings/profile-settings-page/profile-settings-page.component';
import { AdoptionPageComponent } from './users/add-post/pages/adoption-page/adoption-page.component';
import { LostPageComponent } from './users/add-post/pages/lost-page/lost-page.component';
import { DetailPostPageComponent } from './posts/detail-post-page/detail-post-page.component';
import { ChooseUserComponent } from './credentials/choose-user/choose-user.component';
import { ViewProfileUserComponent } from './users/view-profile-user/view-profile-user.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { PerdidosPageComponent } from './mascotas-pages/perdidos-page/perdidos-page.component';
import { EncontradosPageComponent } from './mascotas-pages/encontrados-page/encontrados-page.component';
import { AdopcionPageComponent } from './mascotas-pages/adopcion-page/adopcion-page.component';
import { DetailPostLocalsPageComponent } from './posts/detail-post-locals-page/detail-post-locals-page.component';



const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'perdidos', component: PerdidosPageComponent},
  {path:'encontrados', component: EncontradosPageComponent},
  {path:'adopcion', component: AdopcionPageComponent},
  {path:'usuario', component:ChooseUserComponent},
  {path:'usuario/registro', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'detallePost/:id_post', component:DetailPostPageComponent},
  {path:'user_profile', component: ViewProfileUserComponent},
  {path:'configuracion/unormal', component:ProfileSettingsPageComponent},
  {path: 'publicacion/perdida', component: LostPageComponent },
  {path: 'publicacion/adopcion', component: AdoptionPageComponent },
  {path:'user/configuration', component:ProfileSettingsPageComponent},
  {path:'user_profile/:id_user', component: ViewProfileUserComponent},
  {path:'configuracion/unormal', component:ProfileSettingsPageComponent},
<<<<<<< HEAD
  {path:'detallePostLocalService', component:DetailPostLocalsPageComponent}
];
=======
  ];



>>>>>>> c5ab1d81e06ee1fd541f021cd4c1c918c500b8cd
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
