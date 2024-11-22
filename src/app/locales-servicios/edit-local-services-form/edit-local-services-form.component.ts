import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IlocalServicesSerialization } from '../models/ilocal-services-serialization';
import { IUserCredentialsSerialization } from '../../credentials/models/iuser-credentials-serialization';
import { LocalServicesService } from '../services/local-services.service';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OpeningHoursSerialization } from '../../credentials/models/opening-hours-serialization';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersAuthService } from '../../credentials/services/users-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-local-services-form',
  templateUrl: './edit-local-services-form.component.html',
  styleUrl: './edit-local-services-form.component.css'
})
export class EditLocalServicesFormComponent implements OnInit {

  id_user: number = 0;

  edit_local_service: IlocalServicesSerialization = {
    _id: "",
    id_user: 0,
    photo_profile: "",
    photos: [],
    name: "",
    description: "",
    address: {
      zip_code: 0,
      state: "",
      municipality: "",
      cologne: "",
      street: "",
      outside_number: 0
    },
    phone_number: "",
    opening_hours: [],
    comments: [],
  }

  edit_user: IUserCredentialsSerialization = {
    id_user: 0,
    email: "",
    password_user: "",
    type_user: "",
  }

  days_job: OpeningHoursSerialization[] = [
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

  days_array: string[] = [];
  free_days: boolean[] = [false, false, false, false, false, false, false];

  new_photo: File | null = null;
  photo_profile: any;
  photos_array: any[] = [];

  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  currentStep: number = 1;
  compare_password: string = '';

  colognes:string[] = [];

  constructor(
    private localServicesServices: LocalServicesService,
    private userConfiguration: UserConfigurationService,
    private domSanitizer: DomSanitizer,
    private form: FormBuilder,
    private authServices: UsersAuthService,
  ){
    this.formEdit = form.group({
      nombre_local: ['', ],
      descripcion: ['', ],
      new_password: ['', ],
      compare_new_password: ['', ],
      //codigo_postal : ['', ],
      //estado: ['', ],
      //municipio: ['', ],
      colonia: ['', ],
      no_domicilio: ['', ],
      calle: ['', ],
      telefono: ['', ],
      lunes_comienzo: ['08:00', ],
      lunes_final: ['19:00', ],
      martes_comienzo: ['08:00', ],
      martes_final: ['19:00', ],
      miercoles_comienzo: ['08:00', ],
      miercoles_final: ['19:00', ],
      jueves_comienzo: ['08:00', ],
      jueves_final: ['19:00', ],
      viernes_comienzo: ['08:00', ],
      viernes_final: ['19:00', ],
      sabado_comienzo: ['08:00', ],
      sabado_final: ['19:00', ],
      domingo_comienzo: ['08:00', ],
      domingo_final: ['19:00', ],
    })
  }

  formEdit: FormGroup;


  ngOnInit(): void {
    this.getLocalToEdit();
    this.updateValidators();
    this.modifyOpeningHours();

    this.authServices.getColognes(29140).subscribe(
      response => {
        console.log("Respuesta del server:", response);
        this.colognes = response;
      }
    );
  }

  getProfilePhoto(){
    this.userConfiguration.getOwnProfilePhoto(this.edit_local_service.photo_profile).subscribe(
      (response) => {
        const objImg = URL.createObjectURL(response);
        this.photo_profile = this.domSanitizer.bypassSecurityTrustUrl(objImg);
      },
      (error) => console.log("Error:", error)
    );
  }

  setFormValues() {
    this.formEdit.patchValue({
      nombre_local: this.edit_local_service.name,
      descripcion: this.edit_local_service.description,
      telefono: this.edit_local_service.phone_number,
      colonia: this.edit_local_service.address.cologne,
      calle: this.edit_local_service.address.street,
      no_domicilio: this.edit_local_service.address.outside_number,
      lunes_comienzo: this.edit_local_service.opening_hours[0]?.start_time,
      lunes_final: this.edit_local_service.opening_hours[0]?.end_time,
      martes_comienzo: this.edit_local_service.opening_hours[1]?.start_time,
      martes_final: this.edit_local_service.opening_hours[1]?.end_time,
      miercoles_comienzo: this.edit_local_service.opening_hours[2]?.start_time,
      miercoles_final: this.edit_local_service.opening_hours[2]?.end_time,
      jueves_comienzo: this.edit_local_service.opening_hours[3]?.start_time,
      jueves_final: this.edit_local_service.opening_hours[3]?.end_time,
      viernes_comienzo: this.edit_local_service.opening_hours[4]?.start_time,
      viernes_final: this.edit_local_service.opening_hours[4]?.end_time,
      sabado_comienzo: this.edit_local_service.opening_hours[5]?.start_time,
      sabado_final: this.edit_local_service.opening_hours[5]?.end_time,
      domingo_comienzo: this.edit_local_service.opening_hours[6]?.start_time,
      domingo_final: this.edit_local_service.opening_hours[6]?.end_time,
    });
  }

  updateValidators(){
    /*
    this.formEdit.get('colonia')?.clearValidators();
    this.formEdit.get('no_domicilio')?.clearValidators();
    this.formEdit.get('calle')?.clearValidators();

    if(this.edit_user.type_user === 'Local'){
      this.formEdit.get('colonia')?.setValidators();
      this.formEdit.get('no_domicilio')?.setValidators();
      this.formEdit.get('calle')?.setValidators();
    }

    this.formEdit.get('colonia')?.updateValueAndValidity();
    this.formEdit.get('no_domicilio')?.updateValueAndValidity();
    this.formEdit.get('calle')?.updateValueAndValidity();
    */
  }

  getLocalToEdit() {
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;

    this.localServicesServices.get_local_services_by_id_user(this.id_user).subscribe(
      (response) => {
        console.log("Datos del servidor:", response);
        this.edit_local_service = response;

        this.localServicesServices.get_credentials_of_local_services(response.id_user).subscribe(
          (credentials) => {
            this.edit_user = credentials;
            this.setFormValues(); // Establece los valores originales en el formulario
          },
          (error) => console.log("Error al obtener credenciales:", error)
        );
      },
      (error) => console.log("Error al obtener datos del local:", error)
    );
  }

  modifyOpeningHours(){
    for(let i: number = 0; i < this.edit_local_service.opening_hours.length; i++){
      for(let j: number = 0; i < this.days_job.length; i++){
        if(this.edit_local_service.opening_hours[i].day_care === this.days_job[j].day_care){
          this.days_job[j] = this.edit_local_service.opening_hours[i];
          j = 10;
        }
      }
    }
    this.edit_local_service.opening_hours = this.days_job;
    console.log(this.edit_local_service.opening_hours);
  }

  dontWorksinThatDay(day: string, day_input: string){
    this.days_array.push(day);
    this.formEdit.get(day_input + '_comienzo')?.clearValidators();
    this.formEdit.get(day_input + '_final')?.clearValidators();
  }

  worksInThatDay(day: string, day_input: string){
    for(let i: number = 0; i < this.days_array.length; i++){
      if(day === this.days_array[i]){
        this.days_array.splice(i, 1);
        //this.formEdit.get(day_input + '_comienzo')?.setValidators();
        this.formEdit.get(day_input + '_comienzo')?.updateValueAndValidity();

        //this.formEdit.get(day_input + '_final')?.setValidators();
        this.formEdit.get(day_input + '_final')?.updateValueAndValidity();
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
      for(let j: number = 0; j < this.edit_local_service.opening_hours.length; j++){
        if(this.edit_local_service.opening_hours[j].day_care === this.days_array[i]){
            this.edit_local_service.opening_hours.splice(j, 1);
            j = 10;
          }
      }
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return (this.formEdit.get(controlName)?.hasError(errorType) && this.formEdit.get(controlName)?.touched);
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

  async assignValues() {
    const formData = this.formEdit.value;
  
    // Comparar y actualizar solo campos modificados
    if (formData.nombre_local !== this.edit_local_service.name)
      this.edit_local_service.name = formData.nombre_local;
  
    if (formData.descripcion !== this.edit_local_service.description)
      this.edit_local_service.description = formData.descripcion;
  
    if (formData.telefono !== this.edit_local_service.phone_number)
      this.edit_local_service.phone_number = formData.telefono;
  
    if (formData.colonia !== this.edit_local_service.address.cologne)
      this.edit_local_service.address.cologne = formData.colonia;
  
    if (formData.calle !== this.edit_local_service.address.street)
      this.edit_local_service.address.street = formData.calle;
  
    this.edit_local_service.address.outside_number = formData.no_domicilio;
  
    // Horarios
    this.edit_local_service.opening_hours = [
      { day_care: "Lunes", start_time: formData.lunes_comienzo, end_time: formData.lunes_final },
      { day_care: "Martes", start_time: formData.martes_comienzo, end_time: formData.martes_final },
      { day_care: "Miércoles", start_time: formData.miercoles_comienzo, end_time: formData.miercoles_final },
      { day_care: "Jueves", start_time: formData.jueves_comienzo, end_time: formData.jueves_final },
      { day_care: "Viernes", start_time: formData.viernes_comienzo, end_time: formData.viernes_final },
      { day_care: "Sábado", start_time: formData.sabado_comienzo, end_time: formData.sabado_final },
      { day_care: "Domingo", start_time: formData.domingo_comienzo, end_time: formData.domingo_final },
    ];
  }

  onSubmitEdit() {
    this.assignValues();
    
    if (this.formEdit.valid) {
      this.localServicesServices.edit_local_services(this.edit_local_service).subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Local editado con éxito",
            showConfirmButton: false,
            timer: 2000,
          });
        },
        (error) => {
          console.log("Error al actualizar local:", error);
          Swal.fire({
            icon: "error",
            title: "Error al actualizar",
            showConfirmButton: true,
          });
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Revisa los campos",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

  editLocalServices(){
    if(this.edit_user.password_user === this.compare_password){
      this.localServicesServices.edit_local_services(this.edit_local_service).subscribe(
        (response) => {
          console.log("Respuesta del server:", response);
          Swal.fire({
            icon: "success",
            title: "Local/Servicio editado",
            showConfirmButton: false,
            timer: 2500
          })
        },
        (error) => console.log("Error:", error)
      )
    }else{
      // Aquí va una alerta Swal
    }
  }

  preview_photo: string | null = null;

  listenImage(event: any): void {
    const file = event.target.files[0]; 
    if (file) {
    this.new_photo = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview_photo = reader.result as string;
    };
    reader.readAsDataURL(file); 

    
    console.log("Ejecutando subida de foto");
    //this.postProfilePhoto();
    }
  }
}
