import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IRegistrerUserNormalSerialization } from '../models/iregistrer-user-normal-serialization';
import { IRegisterUserLocalServiceSerialization } from '../models/iregister-user-local-service-serialization';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IRegisterUserSerialization } from '../models/iregister-user-serialization';
import { catchError, map, Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(
    private userAuthServices: UsersAuthService,
    private userConfigurationSerice:UserConfigurationService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private form: FormBuilder
  ) {
    this.formRegistrer = form.group({
      nombre_usuario: ['', [Validators.required]],
      apellidos_usuario: ['', [Validators.required]],
      fecha_de_nacimiento: ['', Validators.required],
      nombre_local: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      correo_electronico: ['', [Validators.email, Validators.required]],
      new_password: ['', [Validators.required]],
      compare_new_password: ['', [Validators.required]],
      //codigo_postal : ['', [Validators.required]],
      //estado: ['', [Validators.required]],
      //municipio: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      no_domicilio: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      lunes_comienzo: ['08:00', [Validators.required]],
      lunes_final: ['19:00', [Validators.required]],
      martes_comienzo: ['08:00', [Validators.required]],
      martes_final: ['19:00', [Validators.required]],
      miercoles_comienzo: ['08:00', [Validators.required]],
      miercoles_final: ['19:00', [Validators.required]],
      jueves_comienzo: ['08:00', [Validators.required]],
      jueves_final: ['19:00', [Validators.required]],
      viernes_comienzo: ['08:00', [Validators.required]],
      viernes_final: ['19:00', [Validators.required]],
      sabado_comienzo: ['08:00', [Validators.required]],
      sabado_final: ['19:00', [Validators.required]],
      domingo_comienzo: ['08:00', [Validators.required]],
      domingo_final: ['19:00', [Validators.required]],
    })
  }

  updateValidators(): void {
    // Limpiar validadores de todos los campos
    this.formRegistrer.get('nombre_usuario')?.clearValidators();
    this.formRegistrer.get('apellidos_usuario')?.clearValidators();
    this.formRegistrer.get('fecha_de_nacimiento')?.clearValidators();
    this.formRegistrer.get('nombre_local')?.clearValidators();
    this.formRegistrer.get('descripcion')?.clearValidators();
    this.formRegistrer.get('telefono')?.clearValidators();
    // Dirección
    //this.formRegistrer.get('codigo_postal')?.clearValidators();
    //this.formRegistrer.get('estado')?.clearValidators();
    //this.formRegistrer.get('municipio')?.clearValidators();
    this.formRegistrer.get('colonia')?.clearValidators();
    this.formRegistrer.get('no_domicilio')?.clearValidators();
    this.formRegistrer.get('calle')?.clearValidators();
    // Horario
    this.formRegistrer.get('lunes_comienzo')?.clearValidators();
    this.formRegistrer.get('lunes_final')?.clearValidators();
    this.formRegistrer.get('martes_comienzo')?.clearValidators();
    this.formRegistrer.get('martes_final')?.clearValidators();
    this.formRegistrer.get('miercoles_comienzo')?.clearValidators();
    this.formRegistrer.get('miercoles_final')?.clearValidators();
    this.formRegistrer.get('jueves_comienzo')?.clearValidators();
    this.formRegistrer.get('jueves_final')?.clearValidators();
    this.formRegistrer.get('viernes_comienzo')?.clearValidators();
    this.formRegistrer.get('viernes_final')?.clearValidators();
    this.formRegistrer.get('sabado_comienzo')?.clearValidators();
    this.formRegistrer.get('sabado_final')?.clearValidators();
    this.formRegistrer.get('domingo_comienzo')?.clearValidators();
    this.formRegistrer.get('domingo_final')?.clearValidators();

    if (this.choosenUser === 'Normal') {
      // Validaciones para usuario normal
      this.formRegistrer.get('nombre_usuario')?.setValidators([Validators.required]);
      this.formRegistrer.get('apellidos_usuario')?.setValidators([Validators.required]);
      this.formRegistrer.get('fecha_de_nacimiento')?.setValidators([Validators.required]);
      
    } else if (this.choosenUser === 'Local') {
      // Validaciones para local
      this.formRegistrer.get('nombre_local')?.setValidators([Validators.required]);
      this.formRegistrer.get('descripcion')?.setValidators([Validators.required]);
      this.formRegistrer.get('telefono')?.setValidators([Validators.required]);
      // Dirección
      // this.formRegistrer.get('codigo_postal')?.setValidators([Validators.required]);
      // this.formRegistrer.get('estado')?.setValidators([Validators.required]);
      // this.formRegistrer.get('municipio')?.setValidators([Validators.required]);
      this.formRegistrer.get('colonia')?.setValidators([Validators.required]);
      this.formRegistrer.get('no_domicilio')?.setValidators([Validators.required]);
      this.formRegistrer.get('calle')?.setValidators([Validators.required]);
      // Horario
      this.formRegistrer.get('lunes_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('lunes_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('martes_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('martes_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('miercoles_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('miercoles_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('jueves_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('jueves_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('viernes_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('viernes_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('sabado_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('sabado_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('domingo_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('domingo_final')?.setValidators([Validators.required]);

    } else if (this.choosenUser === 'Service') {
      // Validaciones para servicios
      this.formRegistrer.get('nombre_local')?.setValidators([Validators.required]);
      this.formRegistrer.get('descripcion')?.setValidators([Validators.required]);
      this.formRegistrer.get('telefono')?.setValidators([Validators.required]);
      // Horario
      this.formRegistrer.get('lunes_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('lunes_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('martes_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('martes_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('miercoles_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('miercoles_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('jueves_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('jueves_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('viernes_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('viernes_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('sabado_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('sabado_final')?.setValidators([Validators.required]);
      this.formRegistrer.get('domingo_comienzo')?.setValidators([Validators.required]);
      this.formRegistrer.get('domingo_final')?.setValidators([Validators.required]);
    }

    // Actualizar los estados de validación
    this.formRegistrer.get('nombre_usuario')?.updateValueAndValidity();
    this.formRegistrer.get('apellidos_usuario')?.updateValueAndValidity();
    this.formRegistrer.get('fecha_de_nacimiento')?.updateValueAndValidity();
    this.formRegistrer.get('nombre_local')?.updateValueAndValidity();
    this.formRegistrer.get('descripcion')?.updateValueAndValidity();
    this.formRegistrer.get('telefono')?.updateValueAndValidity();
    // Dirección
    // this.formRegistrer.get('codigo_postal')?.updateValueAndValidity();
    // this.formRegistrer.get('estado')?.updateValueAndValidity();
    // this.formRegistrer.get('municipio')?.updateValueAndValidity();
    this.formRegistrer.get('colonia')?.updateValueAndValidity();
    this.formRegistrer.get('no_domicilio')?.updateValueAndValidity();
    this.formRegistrer.get('calle')?.updateValueAndValidity();
    // Horario
    this.formRegistrer.get('lunes_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('lunes_final')?.updateValueAndValidity();
    this.formRegistrer.get('martes_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('martes_final')?.updateValueAndValidity();
    this.formRegistrer.get('miercoles_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('miercoles_final')?.updateValueAndValidity();
    this.formRegistrer.get('jueves_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('jueves_final')?.updateValueAndValidity();
    this.formRegistrer.get('viernes_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('viernes_final')?.updateValueAndValidity();
    this.formRegistrer.get('sabado_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('sabado_final')?.updateValueAndValidity();
    this.formRegistrer.get('domingo_comienzo')?.updateValueAndValidity();
    this.formRegistrer.get('domingo_final')?.updateValueAndValidity();

  }

  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  formRegistrer: FormGroup;

  // Variables
  choosenUser: string = '';
  currentStep: number = 1;
  compare_password: string = '';
  file: File | null = null;
  id_file: string = "";

  // Objeto para el registro de un usuario normal
  new_user_normally: IRegistrerUserNormalSerialization = {
    first_name: '',
    last_name: '',
    birthdate: '',
    profile_picture: '',
    email: '',
    password_user: '',
    type_user: '',
  };

  // Objeto para el registro de un usuario de tipo local o servicio
  new_local_service_as_user: IRegisterUserSerialization = {
      email_user: '',
      password_user: '',
      type_user: '',
  };

  // Objeto para el registro de un local o servicio
  new_local_service: IRegisterUserLocalServiceSerialization = {
    id_user: '',
    type: '',
    photo_profile: '',
    name: '',
    description: '',
    address : {
      zip_code: 29140,
      state: "Chiapas",
      municipality: "Ocozocoautla de Espinoza",
      cologne: "",
      outside_number: 0,
      street: ""
    },
    phone_number: "",
    opening_hours: [
      {
        day_care: "Lunes",
        start_time: "",
        end_time: ""
      },
      {
        day_care: "Martes",
        start_time: "",
        end_time: ""
      },
      {
        day_care: "Miércoles",
        start_time: "",
        end_time: ""
      },
      {
        day_care: "Jueves",
        start_time: "",
        end_time: ""
      },
      {
        day_care: "Viernes",
        start_time: "",
        end_time: ""
      },
      {
        day_care: "Sábado",
        start_time: "",
        end_time: ""
      },
      {
        day_care: "Domingo",
        start_time: "",
        end_time: ""
      },
    ]
  }

  colognes: string[] = []

  days_array: string[] = [];
  free_days: boolean[] = [false, false, false, false, false, false, false]
  
  upload_photo: File | null = null;
  download_photo: any;
  id_new_photo: string = "";

  ngOnInit(): void {
    
    const userType = localStorage.getItem('userTypeInTheRegister');
    if (userType) {
      this.choosenUser = userType;
      this.getProfilePhoto();
      this.updateValidators(); 
    }

    this.userAuthServices.getColognes(29140).subscribe(
      response => {
        console.log("Respuesta del server:", response);
        this.colognes = response;
      }
    )
  }
  
  // Métodos

  dontWorksinThatDay(day: string, day_input: string){
    this.days_array.push(day);
    
  }

  worksInThatDay(day: string, day_input: string){
    for(let i: number = 0; i < this.days_array.length; i++){
      if(day === this.days_array[i]){
        this.days_array.splice(i, 1);
        this.formRegistrer.get(day_input + '_comienzo')?.setValidators([Validators.required]);
        this.formRegistrer.get(day_input + '_comienzo')?.updateValueAndValidity();

        this.formRegistrer.get(day_input + '_final')?.setValidators([Validators.required]);
        this.formRegistrer.get(day_input + '_final')?.updateValueAndValidity();
      }
        
    }
  }

  isWorkThatDay(day: string): boolean{
    for(let i: number = 0; i < this.days_array.length; i++){
      if(day === this.days_array[i])
        return false;
    }
    return true;
  }

  saveDaysOfJob(){
    for(let i: number = 0; i < this.days_array.length; i++){
      for(let j: number = 0; j < this.new_local_service.opening_hours.length; j++){
        if(this.new_local_service.opening_hours[j].day_care === this.days_array[i]){
            this.new_local_service.opening_hours.splice(j, 1);
            j = 10;
          }
      }
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return (this.formRegistrer.get(controlName)?.hasError(errorType) && this.formRegistrer.get(controlName)?.touched);
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

  async onSubmitRegister(){
    try{
      await this.assignValues();

      if(this.formRegistrer.valid){
        if(this.download_photo){
          if(this.choosenUser === "Normal"){
            this.registerUser();
            console.log("se mando a registar el usuario normal")
          } else {
            this.saveDaysOfJob();
            this.registerLocalService();
            console.log("se mando a registar el local o servicio")
            console.log(this.formRegistrer.value)
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Ingresa una foto",
            showConfirmButton: false,
            timer: 2500
          })
        }
        
      }else{
        console.log("Nel mijo tas mal")
        console.log(this.formRegistrer);
        Swal.fire({
          icon: "error",
          title: "Campos faltantes o entrada de datos equivocada",
          showConfirmButton: false,
          timer: 2500
        })
      }
      
    }catch(error){
      console.log("Error:", error)
    }
  }

  async assignValues(){
    try{
      const { 
        nombre_usuario,
        apellidos_usuario,
        fecha_de_nacimiento,
        nombre_local,
        descripcion,
        correo_electronico,
        new_password,
        compare_new_password,
        telefono,
        colonia,
        calle,
        no_domicilio,
        lunes_comienzo,
        lunes_final,
        martes_comienzo,
        martes_final,
        miercoles_comienzo,
        miercoles_final,
        jueves_comienzo,
        jueves_final,
        viernes_comienzo,
        viernes_final,
        sabado_comienzo,
        sabado_final,
        domingo_comienzo,
        domingo_final
       } = this.formRegistrer.value;

       // Usuario normal
       this.new_user_normally.first_name = nombre_usuario;
       this.new_user_normally.last_name = apellidos_usuario;
       this.new_user_normally.birthdate = fecha_de_nacimiento;
       this.new_user_normally.email = correo_electronico;
       this.new_user_normally.password_user = new_password;

       // Local o servicio
       this.new_local_service.name = nombre_local;
       this.new_local_service.description = descripcion;
       this.new_local_service.phone_number = telefono;

       // Ubicación
       this.new_local_service.address.cologne = colonia;
       this.new_local_service.address.street = calle;
       this.new_local_service.address.outside_number = no_domicilio;

       //Horario
       this.new_local_service.opening_hours[0].start_time = lunes_comienzo;
       this.new_local_service.opening_hours[0].end_time = lunes_final;
       this.new_local_service.opening_hours[1].start_time = martes_comienzo;
       this.new_local_service.opening_hours[1].end_time = martes_final;
       this.new_local_service.opening_hours[2].start_time = miercoles_comienzo;
       this.new_local_service.opening_hours[2].end_time = miercoles_final;
       this.new_local_service.opening_hours[3].start_time = jueves_comienzo;
       this.new_local_service.opening_hours[3].end_time = jueves_final;
       this.new_local_service.opening_hours[4].start_time = viernes_comienzo;
       this.new_local_service.opening_hours[4].end_time = viernes_final;
       this.new_local_service.opening_hours[5].start_time = sabado_comienzo;
       this.new_local_service.opening_hours[5].end_time = sabado_final;
       this.new_local_service.opening_hours[6].start_time = domingo_comienzo;
       this.new_local_service.opening_hours[6].end_time = domingo_final;

       // Credencial de local o servicio
       this.new_local_service_as_user.email_user = correo_electronico;
       this.new_local_service_as_user.password_user = new_password;

       // Comprobar contraseña
       this.compare_password = compare_new_password;
    }catch(error){
      console.log("Error:", error);
    }
  }

  //img
  postProfilePhoto(){
    if (!this.upload_photo) return;
  
    console.log("Subiendo foto");
    this.userConfigurationSerice.uploadProfilePhoto(this.upload_photo).subscribe({
      next: (response) => {
        console.log("Respuesta del servidor", response);
        this.new_user_normally.profile_picture = response.id_document;
        this.new_local_service.photo_profile = response.id_document;
        this.id_new_photo = response.id_document;
        this.getProfilePhoto();
      },
      error: (err) => console.error("Error:", err),
    });
  }

  getProfilePhoto(){
    if(this.id_new_photo){
      this.userConfigurationSerice.getOwnProfilePhoto(this.id_new_photo).subscribe(
        response => {
          const imgObj = URL.createObjectURL(response);
          this.download_photo = this.domSanitizer.bypassSecurityTrustUrl(imgObj);
        },
        error => console.log("Error:", error)
      );
      console.log(this.new_user_normally.profile_picture)
    }
  }

  //REGISTAR USUARIO
  registerUser() {
    if (this.new_user_normally.password_user === this.compare_password) {
      this.new_user_normally.type_user = this.choosenUser;
      this.new_user_normally.profile_picture = this.id_new_photo;
      console.log(this.new_user_normally.type_user);
      
          this.userAuthServices.registerNormalUser(this.new_user_normally).subscribe(
            (response) => {
              console.log("Respuesta del server:", response)
              Swal.fire({
                icon: "success",
                title: "Te haz registrado en el sistema",
                showConfirmButton: false,
                timer: 2500
              }).then(() => this.router.navigate(['/login']))
            },
            (error) => {
              console.log('Error:', error)
            }
          );
    } else {
      alert('Las contraseñas son diferentes');
    }
  }

  //REGISTAR LOCAL
  registerLocalService() {
    if (this.new_local_service_as_user.password_user === this.compare_password) {
      this.new_local_service_as_user.type_user = this.choosenUser;
      this.userAuthServices.registerLocalServiceAsUser(this.new_local_service_as_user).subscribe(
        (response) => {
          if(response.status === 201) {
              this.new_local_service.type = this.choosenUser;
              this.new_local_service.id_user = response.id; 
              
              this.userAuthServices.registerLocalService(this.new_local_service).subscribe(
                () => {
                  Swal.fire({
                    icon: "success",
                    title: "Te haz registrado exitosamente",
                    showConfirmButton: false,
                    timer: 2500
                  }).then(() => this.router.navigate(['/login']));
                },
                (error) => console.log('Error al registrar el local o servicio:', error)
              );
          }
        },
        (err) => {
          console.log("Error en el registro del usuario:", err);
        }
      );
    } else {
      alert('Las contraseñas son diferentes');
    }
  }
  
  listenImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.upload_photo = file;
      console.log("Ejecutando subida de foto")
      this.postProfilePhoto();
    }
  }

  uploadImage(): Observable<string> {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      
      return this.userAuthServices.saveImage(formData).pipe(
        map(response => 
          this.id_file = response.id_document
        ),
        catchError(err => {
          console.log("Error " + err);
          return of('');  
        })
      );
    }
    return of('');
  }
  
}
