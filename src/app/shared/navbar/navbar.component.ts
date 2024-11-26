import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PostTypeModalComponent } from "../modals/post-type-modal/post-type-modal.component";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AsideComponent, SidebarComponent, PostTypeModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  //Variables
  menuOpenTypePost = false;
  showModalTypePost = false;
  menuOpen = false; 
  showButtonsNav: boolean = true;

  hiddenRoutes: string[] = ['/usuario', '/login', '/usuario/registro', ];

  
  ngOnInit(): void {
    // se suscribe para los cambios de la ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // actualiza la si se ve la vista segun la ruta
        this.showButtonsNav = !this.hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }

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



