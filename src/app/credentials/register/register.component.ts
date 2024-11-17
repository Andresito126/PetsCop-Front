import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IRegistrerUserNormalSerialization } from '../models/iregistrer-user-normal-serialization';
import { IRegisterUserLocalServiceSerialization } from '../models/iregister-user-local-service-serialization';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IRegisterUserSerialization } from '../models/iregister-user-serialization';
import { catchError, map, Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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
    private domSanitizer: DomSanitizer
  ) {}

  // Variables
  choosenUser: string = '';
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
    description: ''
  }
  
  upload_photo: File | null = null;
  download_photo: any;
  id_new_photo: string = "";

  ngOnInit(): void {
    const userType = localStorage.getItem('userTypeInTheRegister');
    if (userType) {
      this.choosenUser = userType;
      this.getProfilePhoto();
    }
  }
  
  // Métodos

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
