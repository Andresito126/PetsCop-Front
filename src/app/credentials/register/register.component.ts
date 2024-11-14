import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { IRegistrerUserNormalSerialization } from '../models/iregistrer-user-normal-serialization';
import { IRegisterUserLocalServiceSerialization } from '../models/iregister-user-local-service-serialization';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  //variables
  choosenUser: string = '';

  constructor(private userAuthServices: UsersAuthService) {}

  new_user_normally: IRegistrerUserNormalSerialization = {
    first_name: '',
    last_name: '',
    birthdate: '',
    profile_picture: 'foto',
    email: '',
    password_user: '',
    type_user: '',
  };

  new_local_service: IRegisterUserLocalServiceSerialization = {
    type_user: '',
    mainPhoto: '',
    // photos:""[],
    name: '',
    description: '',
    // address?:"",
    // opening_hours?: ""[],
    email: '',
    password_LS: '',
  };
  compare_password: string = '';

  ngOnInit(): void {
    const userType = localStorage.getItem('userTypeInTheRegister');
    if (userType) {
      this.choosenUser = userType;
      console.log(this.choosenUser);
    }
  }

                                    //METODOS


  //REGISTAR USUARIO
  registerUser() {
    console.log('el usuario para el registre es' + this.choosenUser);
    if (this.new_user_normally.password_user === this.compare_password) {
      console.log(this.new_user_normally);
      this.userAuthServices.registerNormal(this.new_user_normally).subscribe(
        (response) => console.log('Respuesta del servidor:', response),
        (error) => console.log('Error:', error)
      );

      this.new_user_normally = {
        first_name: '',
        last_name: '',
        birthdate: '',
        profile_picture: 'foto',
        email: '',
        password_user: '',
        type_user: 'Normal',
      };
      console.log("Sen enviaron las credenciales del usuario")
    } else {
      alert('Las contraseñas son diferentes');
    }
  }

  //REGISTAR LOCAL
  registerLocal() {
    console.log('el usuario para el registre es' + this.choosenUser);
    if (this.new_local_service.password_LS === this.compare_password) {
      console.log(this.new_local_service);
      this.userAuthServices
        .registerLocalService(this.new_local_service)
        .subscribe(
          (response) => console.log('Respuesta del servidor:', response),
          (error) => console.log('Error:', error)
        );

      this.new_local_service = {
        type_user: 'Local',
        mainPhoto: '',
        name: '',
        description: '',
        email: '',
        password_LS: '',
      };
      console.log("Sen enviaron las credenciales del lcoal")
    } else {
      alert('Las contraseñas son diferentes');
    }
  }


  //REGISTAR SERVICIO
  registerService() {
    if (this.new_local_service.password_LS === this.compare_password) {
      console.log(this.new_local_service);
      this.userAuthServices
        .registerLocalService(this.new_local_service)
        .subscribe(
          (response) => console.log('Respuesta del servidor:', response),
          (error) => console.log('Error:', error)
        );

      this.new_local_service = {
        type_user: 'Service',
        mainPhoto: '',
        name: '',
        description: '',
        email: '',
        password_LS: '',
      };
      console.log("Sen enviaron las credenciales del servicio")
    } else {
      alert('Las contraseñas son diferentes');
    }
  }
}
