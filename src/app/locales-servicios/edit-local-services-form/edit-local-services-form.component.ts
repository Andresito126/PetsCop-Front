import { Component } from '@angular/core';
import { IlocalServicesSerialization } from '../models/ilocal-services-serialization';

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

  getLocalToEdit(){

  }
}
