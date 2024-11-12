import { Component, inject } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IUserCredentialsSerialization } from '../models/iuser-credentials-serialization';
import { IloginUserSerialization } from '../models/ilogin-user-serialization';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userAuthServices: UsersAuthService){}

  log_credentials: IloginUserSerialization = {
    id_user: 0,
    email: "",
    password_user: "",
    type_user: ""
  }

  fields = [
    { label: 'Correo electrónico', type: 'email', name: 'email', placeholder: 'Ingresa tu correo electrónico', required: true, ngName:"hola" },
    { label: 'Contraseña', type: 'password', name: 'password', placeholder: 'Ingresa tu contraseña', required: true, ngName:"jeje" }
  ];

  async onLogin(data: any) {
    // const response = await this.usersService.login(data);
    // console.log(response);
  }

  login(){
    this.userAuthServices.login(this.log_credentials).subscribe(
      response => {
        console.log("Respuesta del servidor:", response)
      },
      error => console.log("Error:", error)
    );
  }
}
