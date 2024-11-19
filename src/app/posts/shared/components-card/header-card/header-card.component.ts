import { Component, Input, OnInit } from '@angular/core';
import { IUserCredentialsSerialization } from '../../../../credentials/models/iuser-credentials-serialization';
import { IUserDataSerialization } from '../../../../users/models/iuser-data-serialization';
import { UserConfigurationService } from '../../../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css'
})
export class HeaderCardComponent implements OnInit {
 

  constructor(
    private userServices: UserConfigurationService,
    private domSanitizer: DomSanitizer
  ){}

  //variables
  @Input() id_user: number = 0;
  credential_user: IUserCredentialsSerialization = {
    id_user: 0,
    email: "",
    password_user: "",
    type_user: "",
  }
  user_normaly: IUserDataSerialization = {
    id_user_normally: 0,
    id_user: 0,
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_picture: ""
  }

  @Input() user!: string;
  @Input() date!: string;
  @Input() time!: string;
  profile_photo: any;

  ngOnInit(): void {
      this.putUser();
  }

  putUser(){
    this.userServices.getOwnCredentials(this.id_user).subscribe(
      response => {
        console.log("Respuesta del servidor:", response);
        this.credential_user = response;
        this.compareUser();
      },
      error => console.log("Error:", error)
    );
  }

  compareUser(){
    if(this.credential_user.type_user == "Normal"){
      this.userServices.getOwnProfile(this.id_user).subscribe(
        response => {
          console.log("Respuesta del servidor:", response);
          this.user_normaly = response;
          this.userServices.getOwnProfilePhoto(response.profile_picture).subscribe(
            img_response => {
              const imgObj = URL.createObjectURL(img_response);
              this.profile_photo = this.domSanitizer.bypassSecurityTrustUrl(imgObj);
              this.user = this.user_normaly.first_name + " " + this.user_normaly.last_name;
            },
            error => console.log("Error:", error)
          );
        },
        error => console.log("Error:", error)
      );
    }
  }
}
