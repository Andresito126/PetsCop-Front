import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IRegistrerUserNormalSerialization } from '../models/iregistrer-user-normal-serialization';
import { IRegisterUserLocalServiceSerialization } from '../models/iregister-user-local-service-serialization';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IRegisterUserSerialization } from '../models/iregister-user-serialization';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private userAuthServices: UsersAuthService,private userConfigurationSerice:UserConfigurationService ,private router: Router) {}

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
  

  ngOnInit(): void {
    const userType = localStorage.getItem('userTypeInTheRegister');
    if (userType) {
      this.choosenUser = userType;
      this.getProfilePhoto();
    }
  }
  
  // Métodos

  //img
  getProfilePhoto(){
    
    
  }



  //REGISTAR USUARIO
  registerUser() {
    if (this.new_user_normally.password_user === this.compare_password) {
      this.new_user_normally.type_user = this.choosenUser;
      this.new_user_normally.profile_picture = this.id_file;
      console.log(this.new_user_normally.type_user);
      this.uploadImage().subscribe(
        id_img => {
          console.log(id_img)
          this.new_user_normally.profile_picture = id_img;
          this.getProfilePhoto
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
            this.uploadImage().subscribe(id_img => {
              this.new_local_service.type = this.choosenUser;
              this.new_local_service.photo_profile = id_img;
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
            });
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
      this.file = file;
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
