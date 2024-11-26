import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ImessageSerialization } from '../models/imessage-serialization';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './messages-chat.component.html',
  styleUrl: './messages-chat.component.css'
})
export class MessagesChatComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id_chat: string = "";
  @Input() id_user: number = 0;
  @Input() user_name: string = "";
  @Input() photo: any;
  messages: ImessageSerialization[] = [];
  message_is_editing: boolean = false;
  send_this_message_to_edit: ImessageSerialization = {
    _id: "",
    id_user: 0,
    body_message: "",
  }

  constructor(private chatServices: MessageService){}

  ngOnInit(): void {
    console.log("Iniciando chat");
      this.chatServices.join(this.id_chat, this.id_user);
      this.chatServices.load_messages(this.id_chat, (messages) => {this.messages = messages});

      this.chatServices.on_new_message((message) => {
        this.messages.push(message);
      })

      this.chatServices.on_edited_message((message) => {
        for(let i: number = 0; i < this.messages.length; i++){
          if(this.messages[i]._id === message._id){
            this.messages[i] = message;
            i = this.messages.length + 10;
          }
        }
      })

      this.chatServices.on_deleted_message((id_message) => {
        for(let i: number = 0; i < this.messages.length; i++){
          if(this.messages[i]._id === id_message){
            this.messages.splice(i, 1);
            i = this.messages.length + 10;
          }
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['id_chat'] && changes['id_chat'].currentValue){
        console.log("Cambiando id del chat a:", this.id_chat);
        this.ngOnInit();
      }
  }

  ngOnDestroy(): void {
      this.chatServices.on_disconect();
  }

  editingMessage(message: ImessageSerialization){
    this.send_this_message_to_edit = message;
    this.message_is_editing = true;
  }

  closeEditMessage(close: boolean){
    this.message_is_editing = false;
  }

  /*

  editMessage(objMsg: ImessagesSerialization){
    objMsg.body_message = this.edit_body;
    this.chatServices.edit_message(this.id_chat, objMsg);
    this.edit_body = "";
  }
    */
}
