import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PostTypeModalComponent } from "../modals/post-type-modal/post-type-modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AsideComponent, SidebarComponent, PostTypeModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //Variables
  menuOpenTypePost = false;
  showModalTypePost = false;
  menuOpen = false; 

  constructor(private router: Router) {}

  //modals

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  openPostTypeModal() {
    this.showModalTypePost = true; 
  }

  closePostTypeModal() {
    this.showModalTypePost = false; 
  }


  handlePostTypeSelection(postType: 'adopcion' | 'perdida') {
    this.closePostTypeModal();
    if (postType === 'adopcion') {
      this.router.navigate(['/nuevaPublicacion/adopcion']);
    } else if (postType === 'perdida') {
      this.router.navigate(['/nuevaPublicacion/perdida']);
    }
  }
  }

  //methods



