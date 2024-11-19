import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lost-info-cards',
  templateUrl: './lost-info-cards.component.html',
  styleUrl: './lost-info-cards.component.css'
})
export class LostInfoCardsComponent {
  //variables
  @Input() state!: string;
  @Input() municipality!: string;
  @Input() neighborhood!: string;
  @Input() lastSeen!: string;
}
