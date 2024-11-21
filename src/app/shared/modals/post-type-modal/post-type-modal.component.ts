import { CommonModule} from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-type-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-type-modal.component.html',
  styleUrl: './post-type-modal.component.css'
})
export class PostTypeModalComponent {

  //Variables
  @Output() postTypeSelected = new EventEmitter<'adopcion' | 'perdida'>();
  @Output() closeModalTypeSelect = new EventEmitter<void>();

  //methods

  //modals
  onClose() {
    this.closeModalTypeSelect.emit();
  }
  
  selectPostType(postType: 'adopcion' | 'perdida') {
    this.postTypeSelected.emit(postType);
    this.closeModalTypeSelect.emit(); 
  }
}
