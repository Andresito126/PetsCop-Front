import { Component } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IloginUserSerialization } from '../models/ilogin-user-serialization';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userAuthServices: UsersAuthService, private router: Router){}

  // Variables
  logInTypeUser: string = '';

  // Estrucuturas de nuestros objetos
  log_credentials: IloginUserSerialization = {
    email: "",
    password_user: ""
  }

  fields = [
    { label: 'Correo electrónico', type: 'email', name: 'email', placeholder: 'Ingresa tu correo electrónico', required: true, ngName:"hola" },
    { label: 'Contraseña', type: 'password', name: 'password', placeholder: 'Ingresa tu contraseña', required: true, ngName:"jeje" }
  ];

  login(): void {
    this.userAuthServices.login(this.log_credentials).subscribe(
      (response) => {
        if(response.status === 200){
          Swal.fire({
            icon: "success",
            title: "Acceso concedido",
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            localStorage.setItem('token', JSON.stringify(response.token));
            // this.router.navigate(['/inicio'])
          });
        } else if (response.status === 401) {
          Swal.fire({
            title: 'Credenciales inválidas',
            icon: 'error',
            showConfirmButton: false,
            timer: 2500,
          });
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error en el sevidor',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }
}
