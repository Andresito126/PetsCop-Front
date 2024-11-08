import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { IUserDataSerialization } from '../../models/iuser-data-serialization';
import { IuserCredentialsSerialization } from '../../models/iuser-credentials-serialization';
import { DatePipe } from '@angular/common';
import { UserConfigurationService } from '../../services/user-configuration.service';

@Component({
  selector: 'form-profile-user',
  templateUrl: './form-profile-user.component.html',
  styleUrl: './form-profile-user.component.css'
})
export class FormProfileUserComponent {

  constructor(private datePipe: DatePipe, private userConfigService: UserConfigurationService){}

  // Variables
  @Input() profileImageUrl: string = '';
  @Input() first_name: string = '';
  @Input() last_name: string = '';
  @Input() date_birth: string = '';
  @Input() phone_number: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  @Output() data_user = new EventEmitter<IUserDataSerialization>();
  @Output() credential_user = new EventEmitter<IuserCredentialsSerialization>

  

  // Methods to consume the service 


  // Common methods
  emitDataUser(): void {
    this.data_user.emit({
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
      phone_number: this.phone_number,
      profileImageUrl: this.profileImageUrl
    })
  }

  emitCredentialUser(): void {
    this.credential_user.emit({
      email:this.email,
      password: this.password,
    })
  }



  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profileImageUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  submitUserData(): void {
    const userData: IUserDataSerialization = {
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
      phone_number: this.phone_number,
      profileImageUrl: this.profileImageUrl,
    };

    this.userConfigService.updateNormalUser(userData).subscribe(
      updatedUser => {
        this.data_user.emit(updatedUser);  
      },
      error => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
  
}
