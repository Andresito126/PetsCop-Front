import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IchatSerialization } from '../models/ichat-serialization';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent implements OnInit {
  @Input() id_user: number = 0;
  chat_list: IchatSerialization[] = [];
  @Output() id_chat_to_pass = new EventEmitter<string>()

  constructor(
    private chatServices: ChatService,
  ){}

  ngOnInit(): void {
      this.get_chats();
  }

  pass_chat_id(id: string){
    console.log("Pasando chat con el id:", id);
    this.id_chat_to_pass.emit(id);
  }

  get_chats(){
    this.chatServices.get_chats(this.id_user).subscribe(
      response => {
        console.log("It's ok!", response)
        this.chat_list = response;
      },
      error => console.log("Error:", error)
    );
  }
}
