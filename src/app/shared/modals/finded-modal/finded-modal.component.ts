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

  closeModal(): void {
    this.close.emit();
  }

  confirmAction(): void {
    this.confirm.emit();
  }
}
