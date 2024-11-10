import { Component,Input, Output, EventEmitter,SimpleChanges, OnChanges } from '@angular/core';
import { FormFieldsInputs } from '../../../models/form-fields-dinamic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component implements OnChanges{
                    //Variables

  //variables forms y botones siguientes
  @Input() fields: FormFieldsInputs[] = [];
  @Input() buttonText: string = 'Enviar';
  @Output() formSubmitted = new EventEmitter<any>();
  currentStep: number = 1;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep= new EventEmitter<void>();
  form: FormGroup;
  //variables imgs
  @Input() mainImage: string = ''; 
  @Input() additionalImages: string[] = []; 
  @Input() mainPlaceholderIcon: string = '';  
  @Input() additionalPlaceholderIcons: string[] = [];
  mainPhoto: string | ArrayBuffer | null = this.mainImage;
  additionalPhotos: (string | ArrayBuffer | null)[] = [...this.additionalImages];



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.form = this.fb.group({});
      this.fields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        this.form.addControl(field.name, this.fb.control('', validators));
      });
    }
  }

              //Métodos

  //caracteristicas 

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

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  //boton enviar

  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
      console.log('Datos de la mascota:', this.pet);
    } else {
      console.log('Formulario inválido');
    }
   
  }

  //imagenes
  onFileSelect(event: Event, index: number | 'main') {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (index === 'main') {
          this.mainPhoto = reader.result;
        } else {
          this.additionalPhotos[index] = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
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
