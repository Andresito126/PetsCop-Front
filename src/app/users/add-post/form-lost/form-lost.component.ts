import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-lost',
  templateUrl: './form-lost.component.html',
  styleUrl: './form-lost.component.css',
})
export class FormLostComponent implements OnInit{
  //VARIABLES
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  currentStep: number = 1;
  formLost: FormGroup;

  constructor(private form: FormBuilder) {
    this.formLost = this.form.group({
      petType: ['', Validators.required],
      petBreed: ['', Validators.required],
      petName: ['', Validators.required,],
      petAge: ['', Validators.required],
    }),
    characteristics: new FormArray([
      new FormControl(null),
    ]);
  }

  ngOnInit(): void {
      
  }

  //METODOS

  //Form

  hasErrors(controlName:string, errorType:string){
    return this.formLost.get(controlName)?.hasError(errorType) && this.formLost.get(controlName)?.touched
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
    return this.formLost.get('characteristics') as FormArray;
  }

  addCharacteristic() {
    const lastControl = this.characteristics.at(
      this.characteristics.length - 1
    );

    if (lastControl.value.trim() !== '') {
      this.characteristics.push(this.form.control(''));
    } else {
      alert('Debes llenar el input anterior');
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  //ENVIO DEL FORM
  onSubmitForm() {
    console.log(this.formLost);
  }
}
