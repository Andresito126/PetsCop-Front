import { Component, Input } from '@angular/core';
import { IAdressSerialization } from '../../../../credentials/models/iadress-serialization';

@Component({
  selector: 'app-name-address',
  templateUrl: './name-address.component.html',
  styleUrl: './name-address.component.css'
})
export class NameAddressComponent {

  //VARIABLES
  @Input() name!: string;
}
