import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IchatSerialization } from '../models/ichat-serialization';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-contact',
  templateUrl: './card-contact.component.html',
  styleUrl: './card-contact.component.css'
})
export class CardContactComponent implements OnInit {
  @Input() chat_info: IchatSerialization = {
    _id: "",
    id_user_1: 0,
    id_user_2: 0,
    messages: []
  }

  @Output() send_action = new EventEmitter<string>();

  @Input() id_own_user: number = 0;
  id_user_to_search: number = 0;
  user_name: string = "";
  photo_profile: any;

  constructor(
    private userConfigServices: UserConfigurationService,
    private domSanitizer: DomSanitizer,
  ){}

  ngOnInit(): void {
      this.get_contact();
  }

  open_chat(){
    console.log("Abriendo chat:", this.chat_info._id);
    this.send_action.emit(this.chat_info._id);
  }

  get_contact(){
    if(this.id_own_user == this.chat_info.id_user_2)
      this.id_user_to_search = this.chat_info.id_user_1;
    else
      this.id_user_to_search = this.chat_info.id_user_2;

    this.userConfigServices.getOwnCredentials(this.id_user_to_search).subscribe(
      (response) => {
        console.log("Respuesta del servidor:", response);
        if(response.type_user === "Normal"){
          this.userConfigServices.getOwnProfile(response.id_user).subscribe(
            (second_response) => {
              console.log("Usuario normal obtenido", second_response);
              this.user_name = second_response.first_name + " " + second_response.last_name;
              this.userConfigServices.getOwnProfilePhoto(second_response.profile_picture).subscribe(
                (third_response) => {
                  console.log("Obteniendo foto de perfil");
                  const objImg = URL.createObjectURL(third_response);
                  this.photo_profile = this.domSanitizer.bypassSecurityTrustUrl(objImg);
                },
                (error) => console.log("Error", error)
              );
            },
            (error) => console.log("Error:", error)
          )
        } else {
          // Lógica de obtener credenciales de usuario local o servicio;
        }
      },
      (error) => console.log("Error:", error)
    )
  }
}
