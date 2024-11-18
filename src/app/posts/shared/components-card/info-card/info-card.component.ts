import { Component, Input } from '@angular/core';
import { Pet } from '../../../models/pet';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  //variables
  @Input() description!: string;
  @Input() pet!: Pet;
  @Input() images!: string[];
  @Input() post!: Pet;
  @Input() location!: string;
  
}
