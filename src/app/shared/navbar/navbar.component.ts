import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AsideComponent, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false; 
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
