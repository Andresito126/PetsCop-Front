import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.css'
})
export class BasicDataComponent {
  //varibales
  @Input() sex!: string;
  @Input() age!: string;
  @Input() breed!: string;

}
