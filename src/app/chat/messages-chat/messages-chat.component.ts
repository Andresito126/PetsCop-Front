import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ImessageSerialization } from '../models/imessage-serialization';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './messages-chat.component.html',
  styleUrl: './messages-chat.component.css'
})
export class MessagesChatComponent implements OnChanges, OnDestroy {
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

  private listenersInitialized: boolean = false;

  constructor(private chatServices: MessageService){}

  initializeListeners(): void {
    this.chatServices.on_new_message((message) => {
      this.messages.push(message);
    });

    this.chatServices.on_edited_message((message) => {
      for (let i: number = 0; i < this.messages.length; i++) {
        if (this.messages[i]._id === message._id) {
          this.messages[i] = message;
          break;
        }
      }
    });

    this.chatServices.on_deleted_message((id_message) => {
      this.messages = this.messages.filter((msg) => msg._id !== id_message);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['id_chat'] && changes['id_chat'].currentValue){
        console.log("Cambiando id del chat a:", this.id_chat);

        this.chatServices.join(this.id_chat, this.id_user);
        this.chatServices.load_messages(this.id_chat, (messages) => {
          this.messages = messages;
        });
        if (!this.listenersInitialized) {
          this.initializeListeners();
          this.listenersInitialized = true;
        }
      }
  }

  ngOnDestroy(): void {
      this.chatServices.on_disconect();
      this.listenersInitialized = false;
  }

  editingMessage(message: ImessageSerialization){
    this.send_this_message_to_edit = message;
    this.message_is_editing = true;
  }

  closeEditMessage(close: boolean){
    this.message_is_editing = false;
  }
}
