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
import { ViewChatComponent } from './chat/view-chat/view-chat.component';

import { EditLocalServicesFormComponent } from './locales-servicios/edit-local-services-form/edit-local-services-form.component';


import { DetailPostLocalsPageComponent } from './posts/detail-post-locals-page/detail-post-locals-page.component';
import { LocalsPageComponent } from './local-services/pages/locals-page/locals-page.component';

import { UpdateLostPageComponent } from './users/add-post/pages/update-lost-page/update-lost-page.component';
import { UpdateAdoptionPageComponent } from './users/add-post/pages/update-adoption-page/update-adoption-page.component';

import { UserTypeGuard } from './guards/user-type.guard';

const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'perdidos', component: PerdidosPageComponent},
  {path:'encontrados', component: EncontradosPageComponent},
  {path:'adopcion', component: AdopcionPageComponent},
  {path:'usuario', component:ChooseUserComponent},
  {path:'usuario/registro', component:RegisterComponent, canActivate: [UserTypeGuard] },
  {path:'login', component:LoginComponent},
  {path:'detallePost/:id_post', component:DetailPostPageComponent},
  {path: 'publicacion/perdida', component: LostPageComponent },
  {path: 'publicacion/adopcion', component: AdoptionPageComponent },

  {path:'user/configuration', component:ProfileSettingsPageComponent},
  // {path:'configuracion/unormal', component:ProfileSettingsPageComponent},
  {path:'user_profile/:id_user', component: ViewProfileUserComponent},

  // {path:'user_profile', component: ViewProfileUserComponent},
  {path:'detallePostServicios', component:DetailPostLocalsPageComponent},
  {path:'publicacion/locales', component:LocalsPageComponent},
  
  { path: 'crear-publicacion-perdida', component: LostPageComponent },
 
  { path: 'actualizar-publicacion-perdida/:id_post',component: UpdateLostPageComponent},
  { path: 'crear-publicacion-adopcion', component: AdoptionPageComponent },
  { path: 'actualizar-publicacion-adopcion/:id_post', component: UpdateAdoptionPageComponent},
  {path: 'chat', component: ViewChatComponent},

  {path: 'configuracion/local_services', component: EditLocalServicesFormComponent}
  ];








@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
