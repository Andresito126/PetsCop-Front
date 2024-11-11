import { Component } from '@angular/core';
import { IUserDataSerialization } from '../../models/iuser-data-serialization';
import { IuserCredentialsSerialization } from '../../models/iuser-credentials-serialization';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrl: './profile-settings-page.component.css'
})
export class ProfileSettingsPageComponent {

  imprimirMensaje(objet: IUserDataSerialization){
    console.log(objet)
  }
}
