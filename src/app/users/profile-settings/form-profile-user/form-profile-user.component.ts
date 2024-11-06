import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() first_name: string = '';
  @Input() last_name: string = '';
  @Input() date_birth: string = '';
  @Input() phone_number: string = '';

  @Output()
  data_user = new EventEmitter<IUserDataSerialization>

  // Methods to consume the service 


  // Common methods
  emitDataUser(): void {
    this.data_user.emit({
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.datePipe.transform(this.date_birth, 'yyyy-MM-dd') || '',
      phone_number: this.phone_number
    })
  }
}
