import { Component, Input } from '@angular/core';
import { IchatSerialization } from '../models/ichat-serialization';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  @Input() id_user: number = 0;
  chat_list: IchatSerialization[] = [];

  constructor(
    private chatServices: ChatService,
  ){}

  get_chats(){
    this.chatServices.get_chats(this.id_user).subscribe(
      response => {
        console.log("It's ok!")
        this.chat_list = response;
      },
      error => console.log("Error:", error)
    );
  }
}
