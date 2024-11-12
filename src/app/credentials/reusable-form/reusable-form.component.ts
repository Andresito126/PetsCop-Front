import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldCredentials } from '../models/form-field-credentials';


@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrl: './reusable-form.component.css'
})
export class ReusableFormComponent implements OnChanges {
  @Input() fields: FormFieldCredentials[] = [];
  @Input() buttonText: string = 'Enviar';
  @Output() formSubmitted = new EventEmitter();
  @Input() showUserTypeSelect: boolean = false;

  form: FormGroup;

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

  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
