import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private router: Router
  ){}

  @Input() menuOpen = false;  
  @Output() menuToggle = new EventEmitter<void>();  

  id_user: number = 0;
  rol_user: string = "";
  link_configuration_user: string = "";

  toggleMenu() {
    this.menuToggle.emit(); 
  }

  goToProfile(){
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;
    console.log(this.id_user)
    this.router.navigate(["/user_profile", this.id_user]);
  }

  thisUserIsNormal(): boolean{
    const getting_rol = localStorage.getItem("rol");
    this.rol_user = getting_rol ? JSON.parse(getting_rol) : "";
    if(this.rol_user === "Normal")
      return true;
    else
      return false;
  }

}
