import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() menuOpen = false;  
  @Output() menuToggle = new EventEmitter<void>();  

  toggleMenu() {
    this.menuToggle.emit(); 
  }

}
