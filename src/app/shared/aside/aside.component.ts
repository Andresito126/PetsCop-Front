import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {
  constructor(
    private userConfigurationServices: UserConfigurationService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ){}

  imgProfile: any;
  username: string = "";

  rol_user: string = "";
  id_user: number = 0;

  ngOnInit(): void {
      this.getImgProfile();
  }

  goToProfile(){
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;
    console.log(this.id_user)
    this.router.navigate(["/user_profile", this.id_user]);
  }

  getImgProfile(){
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;
    const getting_rol = localStorage.getItem("rol");
    this.rol_user = getting_rol ? JSON.parse(getting_rol) : "";
    
    if(this.rol_user === "Normal"){
      
      this.userConfigurationServices.getOwnProfile(this.id_user).subscribe(
        response => {
          this.username = response.first_name + " " +  response.last_name;
          this.userConfigurationServices.getOwnProfilePhoto(response.profile_picture).subscribe(
            img => {
              const imgObj = URL.createObjectURL(img);
              this.imgProfile = this.domSanitizer.bypassSecurityTrustUrl(imgObj);
            },
            error => console.log("Error:", error)
          );
        },
        error => console.log("Error:", error)
      )
    }
  }
}
