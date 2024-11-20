import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-description',
  templateUrl: './pet-description.component.html',
  styleUrl: './pet-description.component.css'
})
export class PetDescriptionComponent {
//variables
@Input() description: string | null | undefined;
@Input() reward: number | null | undefined;
}
