import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  currentStep: number = 1;
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
    if(this.pet.characteristics[this.pet.characteristics.length-1] !== ""){
      this.pet.characteristics.push('');
    } else {
      alert('Debes llenar el input anterior')
    }
    
    console.log(this.pet.characteristics)
  }

  onSubmit() {
    console.log('Datos de la mascota:', this.pet);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  //siguiente y regreso de los formularios
  onNext() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  onBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }




}
