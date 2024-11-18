import { Component, OnInit } from '@angular/core';
import { IUserDataSerialization } from '../models/iuser-data-serialization';
import { UserConfigurationService } from '../services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IUserCredentialsSerialization } from '../../credentials/models/iuser-credentials-serialization';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent implements OnInit {

  constructor(
    private userConfigurationServies: UserConfigurationService,
    private domSanitizer: DomSanitizer
  ){}

  id_user_normally: number = 7;

  user_normally: IUserDataSerialization = {
    id_user_normally: 0,
    id_user: 0,
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_picture: ""
  }

  user_credentials: IUserCredentialsSerialization = {
    id_user: 0,
    email: "",
    password_user: "",
    type_user: "",
  }

  user_img: any;

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation(){
    this.userConfigurationServies.getOwnProfile(this.id_user_normally).subscribe(
      response => {
        console.log("It's ok!");
        this.user_normally = response;
        this.userConfigurationServies.getOwnProfilePhoto(response.profile_picture).subscribe(
          img => {
            console.log("Obteniendo imágen...");
            const objImg = URL.createObjectURL(img);
            this.user_img = this.domSanitizer.bypassSecurityTrustUrl(objImg);
          },
          error => console.log("Error:", error)
        );
        this.userConfigurationServies.getOwnCredentials(response.id_user_normally).subscribe(
          response => {
            console.log("Credenciales obtenidas");
            this.user_credentials = response;
          },
          error => console.log("Error:", error)
        );
      },
      error => console.log("Error:", error)
    )
  }
}
