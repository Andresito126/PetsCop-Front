import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-more-info-lost',
  templateUrl: './more-info-lost.component.html',
  styleUrl: './more-info-lost.component.css'
})
export class MoreInfoLostComponent {
  //variables de la card y  descirpcion de perdido
  @Input() description: string | null | undefined;
  @Input() reward: number | null | undefined;
  @Input() state!: string| undefined;
  @Input() municipality!: string | undefined;
  @Input() neighborhood!: string | undefined;
  @Input() lastSeen!: string | undefined;

}

