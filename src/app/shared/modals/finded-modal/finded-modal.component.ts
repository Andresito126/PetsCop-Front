import { CommonModule } from '@angular/common';
import { Component , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-finded-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finded-modal.component.html',
  styleUrl: './finded-modal.component.css'
})
export class FindedModalComponent {

  petFindedModal: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeFindedModal(): void {
    this.close.emit();
  }

  sendFindedModal(): void {
    this.confirm.emit();
  }
}
