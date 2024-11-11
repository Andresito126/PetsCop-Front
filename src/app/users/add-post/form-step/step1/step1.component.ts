import { Component,Input, Output, EventEmitter,SimpleChanges, OnChanges } from '@angular/core';
import { FormFieldsInputs } from '../../../models/form-fields-dinamic';
import { FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component implements OnChanges{
                                         // VARIABLES FORM
 @Input() formType: 'adopcion' | 'perdida' | undefined;  
  @Output() formSubmit = new EventEmitter<string>();
                                       
  @Input() fields: FormFieldsInputs[] = []; //
  @Input() buttonText: string = 'Enviar'; 
  @Output() formSubmitted = new EventEmitter<any>(); 
  @Output() nextStep = new EventEmitter<void>(); 
  @Output() previousStep = new EventEmitter<void>(); 
  currentStep: number = 1; 
  form: FormGroup; 
                                        // VARIABLES IMG
  mainPhoto: string | null = null; // Foto principal
  additionalPhotos: string[] = new Array(5).fill(null); 

  
  pet = {
    type: 'perro',
    name: '',
    breed: '',
    age: null,
    characteristics: ['']
  };

  constructor(private fb: FormBuilder) {
   
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        breed: ['', Validators.required],
        age: ['', Validators.required],
        petType: ['', Validators.required],
        characteristics: this.fb.array([this.fb.control('')]) 
      });

                                       // METODOS
      //controldores de los campos
      this.fields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        this.form.addControl(field.name, this.fb.control('', validators));
      });
    }
  }

  
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

  //envio
  onSubmitForm() {
    
    if (this.formType === 'adopcion') {
      this.submitAdopcion();
    } else if (this.formType === 'perdida') {
      this.submitPerdida();
    }
  }

  submitAdopcion() {
    console.log('Formulario de adopción enviado');

  }

  submitPerdida() {
    console.log('Formulario de pérdida enviado');
    
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


  //METODO SUBIR IMG
  onFileSelect(event: any, index: string | number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (index === 'main') {
          this.mainPhoto = reader.result as string; // Asigna la foto principal
        } else {
          this.additionalPhotos[+index] = reader.result as string; // Asigna las fotos adicionales
        }
      };
      reader.readAsDataURL(file);
    }
  }
  

  
}