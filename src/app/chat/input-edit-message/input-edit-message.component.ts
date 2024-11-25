import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ImessageSerialization } from '../models/imessage-serialization';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-input-edit-message',
  templateUrl: './input-edit-message.component.html',
  styleUrl: './input-edit-message.component.css'
})
export class InputEditMessageComponent {
  @Input() id_chat: string = "";
  @Input() edit_this_message: ImessageSerialization = {
    _id: "",
    id_user: 0,
    body_message: "",
  }

  @Output() close_input = new EventEmitter<boolean>();

  constructor(private chatServices: MessageService){}

  editMessage(){
    this.chatServices.edit_message(this.id_chat, this.edit_this_message);
    this.edit_this_message = {
      _id: "",
      id_user: 0,
      body_message: "",
    }
    this.close_input.emit(false);
  }

  cancel(){
    this.edit_this_message = {
      _id: "",
      id_user: 0,
      body_message: "",
    }
    this.close_input.emit(false);
  }
}
