import { Component } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
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
