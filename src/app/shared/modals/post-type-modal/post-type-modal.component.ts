import { CommonModule} from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-type-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-type-modal.component.html',
  styleUrl: './post-type-modal.component.css'
})
export class PostTypeModalComponent {

  constructor(private router: Router) {}

  //Variables
  @Output() postTypeSelected = new EventEmitter<'adopcion' | 'perdida'>();
  @Output() closeModalTypeSelect = new EventEmitter<void>();

  //methods

  //modals
  onClose() {
    this.closeModalTypeSelect.emit();
  }
  
  selectPostType(postType: 'adopcion' | 'perdida') {
    if (postType === 'adopcion') {
      this.router.navigate(['/crear-publicacion-adopcion']);
      this.closeModalTypeSelect.emit();
    } else if (postType === 'perdida') {
      this.router.navigate(['/crear-publicacion-perdida']);
      this.closeModalTypeSelect.emit();
    }
  }
}
