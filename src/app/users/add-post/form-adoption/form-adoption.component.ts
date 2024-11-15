import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';

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
  formAdoption: FormGroup;
  //pics
  photos: (string | ArrayBuffer | null)[] = Array(5).fill(null);



  constructor(private form: FormBuilder, private formBuilder: FormBuilder) {
    this.formAdoption = this.form.group({
      //caracteristicas
      petType: ['', Validators.required],
      petBreed: ['', Validators.required],
      petName: ['', Validators.required,],
      petAge: ['', Validators.required],
      characteristics: this.formBuilder.array([new FormControl('')]),
      //salud mascota
      vaccines: ['', Validators.required],
      primer: [''],
      issues: ['', Validators.required,],
      issuesSentence: [''],
      operations:  ['', Validators.required],
      operationsSentence:[''],
      //pics
      photos: this.formBuilder.array(Array(5).fill('')),
    });
    
  }

  ngOnInit(): void {
      
  }

  //METODOS

  //Form

  hasErrors(controlName:string, errorType:string){
    return this.formAdoption.get(controlName)?.hasError(errorType) && this.formAdoption.get(controlName)?.touched
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

  //caracteristoicas

  get characteristics(): FormArray {
    return this.formAdoption.get('characteristics') as FormArray;
  }

 addCharacteristic() {
    const lastControl = this.characteristics.at(this.characteristics.length - 1);
    if (lastControl && lastControl.value.trim() !== '') {
      this.characteristics.push(new FormControl(''));
    } else {
      alert('Debes llenar el input anterior antes de agregar otro.');
    }
  }

  // trackByIndex(index: number, obj: any): any {
  //   return index;
  // }

  //ENVIO DEL FORM
  onSubmitFormAdoption() {
    if (this.formAdoption.valid) {
      console.log(this.formAdoption);
      // aca se dee llamar la api creo??????
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }


  //form imagenes
  onFileSelect(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photos[index] = reader.result as string | ArrayBuffer;
        const photosControl = this.formAdoption.get('photos') as FormArray;
        if (!photosControl.at(index)) {
          photosControl.push(new FormControl(''));
        }
        photosControl.at(index).setValue(this.photos[index]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

}