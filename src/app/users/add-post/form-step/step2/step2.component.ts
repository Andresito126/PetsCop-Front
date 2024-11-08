import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep= new EventEmitter<void>();
 
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

  onNext() {
    this.nextStep.emit();
  }
  onBack() {
    this.previousStep.emit();
  }
 
}
