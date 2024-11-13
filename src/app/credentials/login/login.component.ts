import { Component, inject, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IUserCredentialsSerialization } from '../models/iuser-credentials-serialization';
import { IloginUserSerialization } from '../models/ilogin-user-serialization';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  logInTypeUser :string="";

  constructor(private userAuthServices: UsersAuthService){}

  ngOnInit(): void {
    const userType = localStorage.getItem('userTypeInTheRegister');
    if (userType) {
      this.logInTypeUser = userType; 
      console.log(`Tipo de usuario en login: ${this.log_credentials.type_user}`);
    } else {
      console.log("No se seleccionó un tipo de usuario.");
    }
  }

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
