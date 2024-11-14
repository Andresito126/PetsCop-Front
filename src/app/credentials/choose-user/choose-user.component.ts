import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrl: './choose-user.component.css'
})
export class ChooseUserComponent {

  type_user_in_register: string = '';
constructor(private router: Router) {}

  setUserType(type: string) {
    this.type_user_in_register = type;
    console.log(`user seleccionado: ${this.type_user_in_register}`);
    localStorage.setItem('userTypeInTheRegister', this.type_user_in_register); 
    this.router.navigate(['/usuario/registro']);
  }
}
