import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { IUserDataSerialization } from '../../models/iuser-data-serialization';
import { IuserCredentialsSerialization } from '../../models/iuser-credentials-serialization';
import { DatePipe } from '@angular/common';
import { UserConfigurationService } from '../../services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'form-profile-user',
  templateUrl: './form-profile-user.component.html',
  styleUrl: './form-profile-user.component.css'
})
export class FormProfileUserComponent implements OnInit{

  constructor(private datePipe: DatePipe, 
    private userConfigService: UserConfigurationService,
    private domSanitizer: DomSanitizer){}

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

  new_img: File | null = null;
  profileImg: any;

  //Method on init to extract the user

  ngOnInit(): void {
      this.loadUserData();
  }

  // Methods to consume the service 

  loadUserData(): void {
    this.userConfigService.getOwnProfile(7).subscribe(
      response => {
        console.log("It's ok", response);
        this.user_normaly = response;
        this.getProfilePhoto();
      },
      error => console.log("Error:", error)
    );
  
    this.userConfigService.getOwnCredentials(7).subscribe(
      response => {
        console.log("It's ok", response);
        this.user_credential = response;
      },
      error => console.log("Error", error)
    );
  }
  

  getProfilePhoto(){
    console.log(this.user_normaly.profile_picture);
    this.userConfigService.getOwnProfilePhoto(this.user_normaly.profile_picture).subscribe(
      respone => {
        const img = URL.createObjectURL(respone);
        this.profileImg = this.domSanitizer.bypassSecurityTrustUrl(img);
      },
      error => console.log("Error:", error)
    );
  }

  putProfilePhoto(): void {
    if (!this.new_img) return;
  
    console.log("Subiendo foto");
    this.userConfigService.uploadProfilePhoto(this.new_img).subscribe({
      next: (response) => {
        console.log("Respuesta del servidor", response);
        this.user_normaly.profile_picture = response.id_document;
        this.editProfile();
      },
      error: (err) => console.error("Error:", err),
    });
  }
  

  editProfile(){
    
      this.userConfigService.updateNormalUser(this.user_normaly).subscribe(
        response => console.log("Respuesta del servidor:", response),
        error => console.log("Error:", error)
      );
    
    this.loadUserData();
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
    if(file){
      this.new_img = file;
      this.putProfilePhoto();
    }
    console.log(this.new_img);
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
