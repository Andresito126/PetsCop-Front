import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersAuthService } from '../services/users-auth.service';
import { IRegistrerUserSerialization } from '../models/iregistrer-user-serialization';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userAuthServices: UsersAuthService){}

  usersService = inject(UsersAuthService);

  new_user_normally: IRegistrerUserSerialization = {
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_picture: "foto",
    email: "",
    password_user: "",
    type_user: "Normal",
  }

  compare_password: string = "";

  fields = [
    { label: 'Nombre', type: 'text', name: 'name', placeholder: 'Ingresa tu nombre', required: true, ngName: this.new_user_normally.first_name },
    { label: 'Apellidos', type: 'text', name: 'paternal_surname', placeholder: 'Ingresa tu apellido paterno', required: true, ngName: this.new_user_normally.last_name },
    { label: 'Fecha de Nacimiento', type: 'date', name: 'birthdate', required: true, ngName: this.new_user_normally.birthdate },
    { label: 'Correo Electrónico', type: 'email', name: 'email', placeholder: 'Ingresa tu correo electrónico', required: true, ngName: this.new_user_normally.email},
    { label: 'Contraseña', type: 'password', name: 'password', placeholder: 'Ingresa tu contraseña', required: true, ngName: this.new_user_normally.password_user },
    { label: 'Confirmar Contraseña', type: 'password', name: 'confirmPassword', placeholder: 'Confirma tu contraseña', required: true, ngName: this.compare_password }
  ];

  registrer(){
    if(this.new_user_normally.password_user === this.compare_password){
      console.log(this.new_user_normally);
      this.userAuthServices.register(this.new_user_normally).subscribe(
        response => console.log("Respuesta del servidor:", response),
        error => console.log("Error:", error)
      );

      this.new_user_normally = {
        first_name: "",
        last_name: "",
        birthdate: "",
        profile_picture: "foto",
        email: "",
        password_user: "",
        type_user: "Normal",
      }
    } else {
      console.log("Las contraseñas son diferentes")
    }
    
  }
}