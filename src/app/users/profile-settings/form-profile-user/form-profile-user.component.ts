import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { IUserDataSerialization } from '../../models/iuser-data-serialization';
import { IuserCredentialsSerialization } from '../../models/iuser-credentials-serialization';
import { DatePipe } from '@angular/common';
import { UserConfigurationService } from '../../services/user-configuration.service';

@Component({
  selector: 'form-profile-user',
  templateUrl: './form-profile-user.component.html',
  styleUrl: './form-profile-user.component.css'
})
export class FormProfileUserComponent implements OnInit{

  constructor(private datePipe: DatePipe, private userConfigService: UserConfigurationService){}

  // Variables
  @Input() profileImageUrl: string = '';
  
  // @Input() id_user: number=1;
  // @Input() first_name: string = '';
  // @Input() last_name: string = '';
  // @Input() date_birth: string = '';
  // @Input() phone_number: string = '';
  // @Input() email: string = '';
  // @Input() password: string = '';
  @Output() data_user = new EventEmitter<IUserDataSerialization>();
  @Output() credential_user = new EventEmitter<IuserCredentialsSerialization>

  user_credential: IuserCredentialsSerialization = {
    id_user: 0,
    email:"",
    password_user:"",
    type_user: ""
  }

  user_normaly: IUserDataSerialization = {
    id_user_normally: 0,
    id_user: 0,
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_picture:""
  }

  //Method on init to extract the user

  ngOnInit(): void {
      this.userConfigService.getOwnProfile(1).subscribe(
        response => {
          console.log("It's ok", response);
          this.user_normaly = response;
        },
        error => console.log("Error:", error)
      )
      this.userConfigService.getOwnCredentials(1).subscribe(
        response => {
          console.log("It's ok", response);
          this.user_credential = response;
        },
        error => console.log("Error", error)
      )
  }

  // Methods to consume the service 

  editProfile(): void {
    this.userConfigService.updateNormalUser(this.user_normaly).subscribe(
      response => console.log("Respuesta del server:", response),
      error => console.log("Error:", error)
    )
    this.ngOnInit();
  }

  editPassword(): void{
    this.userConfigService.editPassword(this.user_credential).subscribe(
      response => console.log("Respuesta del server:", response),
      error => console.log("Error:", error)
    )
    this.ngOnInit();
  }

  // Common methods
  emitDataUser(): void {
    /*
    this.data_user.emit({
      id_user:this.id_user,
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
      phone_number: this.phone_number,
      profileImageUrl: this.profileImageUrl
    })
      */
  }

  emitCredentialUser(): void {
    // /*
    // this.credential_user.emit({
    //   email:this.email,
    //   password: this.password,
    // })
    //   */
  }



  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profileImageUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  // submitUserData(): void {
  //   const userData: IUserDataSerialization = {
  //     id_user_normally: 0,
  //     id_user: this.id_user,
  //     first_name: this.first_name,
  //     last_name: this.last_name,
  //     birthdate: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
  //     profile_picture: this.profileImageUrl,
  //   };

  //   this.userConfigService.updateNormalUser(userData).subscribe(
  //     updatedUser => {
  //       this.data_user.emit(updatedUser);  
  //     },
  //     error => {
  //       console.error('Error al actualizar el usuario', error);
  //     }
  //   );
  // }
  
}
