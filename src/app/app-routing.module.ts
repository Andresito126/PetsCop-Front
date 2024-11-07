import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsPageComponent } from './users/profile-settings/profile-settings-page/profile-settings-page.component';
import { AdoptionPageComponent } from './users/add-post/pages/adoption-page/adoption-page.component';
import { LostPageComponent } from './users/add-post/pages/lost-page/lost-page.component';

const routes: Routes = [
  {path:'', component:ProfileSettingsPageComponent},
  { path: 'publicacion/perdida', component: LostPageComponent },
  { path: 'publicacion/adopcion', component: AdoptionPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
