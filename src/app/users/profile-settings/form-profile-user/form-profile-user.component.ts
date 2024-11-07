import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { IUserDataSerialization } from '../../models/iuser-data-serialization';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'form-profile-user',
  templateUrl: './form-profile-user.component.html',
  styleUrl: './form-profile-user.component.css'
})
export class FormProfileUserComponent {

  constructor(private datePipe: DatePipe){}

  // Variables
  @Input() profileImageUrl: string = '';
  @Input() first_name: string = '';
  @Input() last_name: string = '';
  @Input() date_birth: string = '';
  @Input() phone_number: string = '';
  @Input() email: string = '';
  @Input() password: string = '';

  @Output()
  data_user = new EventEmitter<IUserDataSerialization>

  @Output()
  credential_user = new EventEmitter<IUserDataSerialization>
  

  // Methods to consume the service 


  // Common methods
  emitDataUser(): void {
    this.data_user.emit({
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
      phone_number: this.phone_number,
      email:this.email,
      password: this.password,
      profileImageUrl: this.profileImageUrl
    })
  }

  emitCredentialUser(): void {
    this.data_user.emit({
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
      phone_number: this.phone_number,
      email:this.email,
      password: this.password,
      profileImageUrl: this.profileImageUrl
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
}
