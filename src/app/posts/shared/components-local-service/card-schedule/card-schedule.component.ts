import { Component, Input } from '@angular/core';
import { OpeningHoursSerialization } from '../../../../credentials/models/opening-hours-serialization';

@Component({
  selector: 'app-card-schedule',
  templateUrl: './card-schedule.component.html',
  styleUrl: './card-schedule.component.css',
})
export class CardScheduleComponent {
  @Input() openingHours: OpeningHoursSerialization[] = [];
}
