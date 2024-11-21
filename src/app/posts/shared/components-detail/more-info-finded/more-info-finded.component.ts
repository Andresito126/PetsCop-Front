import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-more-info-finded',
  templateUrl: './more-info-finded.component.html',
  styleUrl: './more-info-finded.component.css'
})
export class MoreInfoFindedComponent {
  @Input() agradecimiento: string | null | undefined;

}
