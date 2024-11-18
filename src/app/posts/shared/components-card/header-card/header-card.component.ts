import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css'
})
export class HeaderCardComponent {

  //variables
  @Input() user!: string;
  @Input() date!: string;
  @Input() time!: string;
}
