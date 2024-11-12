import { Component, inject } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usersService = inject(UsersAuthService);

  fields = [
    { label: 'Correo electrónico', type: 'email', name: 'email', placeholder: 'Ingresa tu correo electrónico', required: true, ngName:"hola" },
    { label: 'Contraseña', type: 'password', name: 'password', placeholder: 'Ingresa tu contraseña', required: true, ngName:"jeje" }
  ];

  async onLogin(data: any) {
    const response = await this.usersService.login(data);
    console.log(response);
  }
}
