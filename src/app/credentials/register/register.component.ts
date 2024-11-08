import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersAuthService } from '../services/users-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usersService = inject(UsersAuthService);

  fields = [
    { label: 'Nombre', type: 'text', name: 'name', placeholder: 'Ingresa tu nombre', required: true },
    { label: 'Apellido Paterno', type: 'text', name: 'paternal_surname', placeholder: 'Ingresa tu apellido paterno', required: true },
    { label: 'Apellido Materno', type: 'text', name: 'maternal_surname', placeholder: 'Ingresa tu apellido materno', required: true },
    { label: 'Fecha de Nacimiento', type: 'date', name: 'birthdate', required: true },
    { label: 'Número de Teléfono', type: 'number', name: 'phone_number', placeholder: 'Ingresa tu número de teléfono', required: true },
    { label: 'Correo Electrónico', type: 'email', name: 'email', placeholder: 'Ingresa tu correo electrónico', required: true },
    { label: 'Contraseña', type: 'password', name: 'password', placeholder: 'Ingresa tu contraseña', required: true },
    { label: 'Confirmar Contraseña', type: 'password', name: 'confirmPassword', placeholder: 'Confirma tu contraseña', required: true }
  ];

  async onRegister(data: any) {
    const response = await this.usersService.register(data);
    console.log(response);
  }
}