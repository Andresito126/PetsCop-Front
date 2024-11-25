import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name-address',
  templateUrl: './name-address.component.html',
  styleUrl: './name-address.component.css'
})
export class NameAddressComponent {

  //VARIABLES
  @Input() name!: string;
  @Input() address!: string;
}
