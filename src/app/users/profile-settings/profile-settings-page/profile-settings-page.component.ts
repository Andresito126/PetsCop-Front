import { Component } from '@angular/core';
import { IUserDataSerialization } from '../../models/iuser-data-serialization';
import { IuserCredentialsSerialization } from '../../models/iuser-credentials-serialization';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrl: './profile-settings-page.component.css'
})
export class ProfileSettingsPageComponent {
  f = 'kevin'
  g = 'Morales Pérez'
  h = '2024-11-05'
  i = '9612493893'
  j= 'kevincito@gmail.com'
  k= 'Jejeto'

  imprimirMensaje(objet: IUserDataSerialization){
    console.log(objet)
  }
}
