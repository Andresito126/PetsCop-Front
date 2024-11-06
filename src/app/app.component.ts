import { Component } from '@angular/core';
import { IUserDataSerialization } from './users/models/iuser-data-serialization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  f = 'kevin'
  g = 'Morales Pérez'
  h = '2024-11-05'
  i = '9612493893'

  imprimirMensaje(objet: IUserDataSerialization){
    console.log(objet)
  }
}
