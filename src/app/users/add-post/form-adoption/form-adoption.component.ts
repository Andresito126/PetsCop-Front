import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-adoption',
  templateUrl: './form-adoption.component.html',
  styleUrl: './form-adoption.component.css'
})
export class FormAdoptionComponent {

              //VARIABLES
  @Output() nextStep = new EventEmitter<void>(); 
  @Output() previousStep = new EventEmitter<void>();
  currentStep: number = 1; 
  form: FormGroup;  
  
  constructor(private fb: FormBuilder) {
   
    this.form = this.fb.group({});
  }


                //METODOS

  

  get characteristics(): FormArray {
    return this.form.get('characteristics') as FormArray;
  }

  addCharacteristic() {
    const lastControl = this.characteristics.at(this.characteristics.length - 1);
  
    if (lastControl.value.trim() !== '') {
      this.characteristics.push(this.fb.control('')); 
    } else {
      
      alert('Debes llenar el input anterior');
    }
  }

  
  trackByIndex(index: number, obj: any): any {
    return index;
  }

    // botones next y back del form
    onNext() {
      if (this.currentStep < 3) {
        this.currentStep++;
        this.nextStep.emit(); 
      }
    }
  
    onBack() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.previousStep.emit(); 
      }
    }

               //ENVIO DEL FORM
  onSubmitForm() {
    
    console.log(this.form)
  }


  



}
