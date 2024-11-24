import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImessageSerialization } from '../models/imessage-serialization';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message: ImessageSerialization = {
    _id: "",
    id_user: 0,
    body_message: "",
  }
  @Input() id_chat: string = "";
  @Input() id_user: number = 0;

  @Output() edit_this_message = new EventEmitter<ImessageSerialization>();

  constructor(private chatServices: MessageService){}

  deleteMessage(id_message: string){
    this.chatServices.delete_message(this.id_chat, id_message);
  }

  editMessage(){
    this.edit_this_message.emit(this.message);
  }
}
