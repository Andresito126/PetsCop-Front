import { Component } from '@angular/core';
import { IlocalServicesSerialization } from '../models/ilocal-services-serialization';
import { IUserCredentialsSerialization } from '../../credentials/models/iuser-credentials-serialization';
import { LocalServicesService } from '../services/local-services.service';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OpeningHoursSerialization } from '../../credentials/models/opening-hours-serialization';

@Component({
  selector: 'app-edit-local-services-form',
  templateUrl: './edit-local-services-form.component.html',
  styleUrl: './edit-local-services-form.component.css'
})
export class EditLocalServicesFormComponent {
  id_user: number = 0;

  edit_local_service: IlocalServicesSerialization = {
    _id: "",
    id_user: 0,
    photo_profile: "",
    photos: [],
    name: "",
    description: "",
    address: {
      zip_code: 0,
      state: "",
      municipality: "",
      cologne: "",
      street: "",
      outside_number: 0
    },
    phone_number: "",
    opening_hours: [],
    comments: [],
  }

  edit_user: IUserCredentialsSerialization = {
    id_user: 0,
    email: "",
    password_user: "",
    type_user: "",
  }

  days_job: OpeningHoursSerialization[] = [
    {
      day_care: "Lunes",
      start_time: "",
      end_time: ""
    },
    {
      day_care: "Martes",
      start_time: "",
      end_time: ""
    },
    {
      day_care: "Miércoles",
      start_time: "",
      end_time: ""
    },
    {
      day_care: "Jueves",
      start_time: "",
      end_time: ""
    },
    {
      day_care: "Viernes",
      start_time: "",
      end_time: ""
    },
    {
      day_care: "Sábado",
      start_time: "",
      end_time: ""
    },
    {
      day_care: "Domingo",
      start_time: "",
      end_time: ""
    },
  ]

  photo_profile: any;
  photos_array: any[] = [];

  constructor(
    private localServicesServices: LocalServicesService,
    private userConfiguration: UserConfigurationService,
    private domSanitizer: DomSanitizer
  ){}

  getLocalToEdit(){
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;
    this.localServicesServices.get_local_services_by_id_user(this.id_user).subscribe(
      (response) => {
        console.log("Respuesta correcta del server:", response);
        this.edit_local_service = response;
        this.userConfiguration.getOwnCredentials(this.id_user).subscribe(
          (another_response) => {
            console.log("Obteniendo credenciales");
            this.edit_user = another_response;
            this.userConfiguration.getOwnProfilePhoto(response.photo_profile).subscribe(
              (img) => {
                console.log("Obteniendo imágen");
                const objImg = URL.createObjectURL(img);
                this.photo_profile = this.domSanitizer.bypassSecurityTrustUrl(objImg);
              },
              (error) => console.log("Error:", error)
            );
          },
          (error) => console.log("Error:", error)
        );
      },
      (error) => console.log("Error:", error)
    );
  }

  modifyOpeningHours(){
    for(let i: number = 0; i < this.edit_local_service.opening_hours.length; i++){
      
    }
  }
}
