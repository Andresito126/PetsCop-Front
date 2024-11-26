import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IAdressSerialization } from '../../../../credentials/models/iadress-serialization';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {
  //variables de descripcion
  @Input() description: string | null | undefined;
  @Input() address: IAdressSerialization | undefined;
}
