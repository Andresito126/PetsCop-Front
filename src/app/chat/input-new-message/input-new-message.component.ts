import { Component, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ImessageSerialization } from '../models/imessage-serialization';

@Component({
  selector: 'app-input-new-message',
  templateUrl: './input-new-message.component.html',
  styleUrl: './input-new-message.component.css'
})
export class InputNewMessageComponent {
  @Input() id_user: number = 0;
  @Input() id_chat: string = "";
  body: string = "";

  constructor(private chatServices: MessageService){}

  sendMessage(){
    const new_message: ImessageSerialization = {
      _id: "",
      id_user: this.id_user,
      body_message: this.body,
    }
    this.chatServices.send_message(this.id_chat, new_message)
    this.body = "";
  }
}
