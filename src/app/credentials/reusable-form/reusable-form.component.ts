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
  formData: any = {}; 
  @Input() fields: FormFieldInputs[] = [];
  @Input() buttonText: string = 'Enviar';
  @Output() formSubmitted = new EventEmitter();
  @Input() actionType: string = ''; 




  form: FormGroup;

  @Output() user_type_field = new EventEmitter();
  user_type: string = "";
  compare_password: string = "";
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
ngOnChanges(changes: SimpleChanges): void {
  if (changes['fields'] && this.fields) {
   
    this.fields.forEach(field => {
      if (!this.formData.hasOwnProperty(field.name)) {
        this.formData[field.name] = ''; 
      }
    });
  }
}

  register(){
    if(this.new_user_normally.password_user === this.compare_password){
        // console.log(this.new_user_normally);
        // this.userAuthServices.register(this.new_user_normally).subscribe(
        //   response => console.log("Respuesta del servidor:", response),
        //   error => console.log("Error:", error)
      console.log("registro enviado") 
    }
  }

  login(){
    if(this.new_user_normally.password_user === this.compare_password){
        // console.log(this.new_user_normally);
        // this.userAuthServices.register(this.new_user_normally).subscribe(
        //   response => console.log("Respuesta del servidor:", response),
        //   error => console.log("Error:", error)
      console.log("login enviado")
    }
  }

    
  onSubmit() {
    if (this.actionType === 'login') {
      this.login();
    } else if (this.actionType === 'register') {
      this.register();
    }
    this.formSubmitted.emit(this.formData); // Emitimos los datos al componente padre
  }
}
