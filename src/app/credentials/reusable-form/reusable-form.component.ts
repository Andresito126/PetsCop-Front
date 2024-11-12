import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldInputs } from '../models/form-field-inputs';
import { IRegistrerUserSerialization } from '../models/iregistrer-user-serialization';
import { UsersAuthService } from '../services/users-auth.service';


@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrl: './reusable-form.component.css'
})
export class ReusableFormComponent implements OnChanges {
  @Input() fields: FormFieldInputs[] = [];
  @Input() buttonText: string = 'Enviar';
  @Output() formSubmitted = new EventEmitter();
  @Input() showUserTypeSelect: boolean = false;

  form: FormGroup;

  @Output() user_type_field = new EventEmitter();
  user_type: string = "";

  new_user_normally: IRegistrerUserSerialization = {
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_picture: "",
    email: "",
    password_user: "",
    type_user: "",
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
/*
  registrer(){
    this.userAuthServices.register(this.new_user_normally).subscribe(
      response => console.log("Respuesta del servidor:", response),
      error => console.log("Error:", error)
    );
  }
*/
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
