import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name-status',
  templateUrl: './name-status.component.html',
  styleUrl: './name-status.component.css'
})
export class NameStatusComponent {
  //VARIABLES
  @Input() name!: string;
  @Input() status!: string;


}
