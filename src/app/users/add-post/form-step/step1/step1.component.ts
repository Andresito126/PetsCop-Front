import { Component } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  pet = {
    type: 'perro',
    name: '',
    breed: '',
    age: null,
    characteristics: ['']
  };

  addCharacteristic() {
    this.pet.characteristics.push('');
  }

  onSubmit() {
    console.log('Datos de la mascota:', this.pet);
  }

}
