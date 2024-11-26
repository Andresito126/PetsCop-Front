import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ImessageSerialization } from '../models/imessage-serialization';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _url_api_mongo: string = "http://localhost:3000/";
  private socket: Socket;

  constructor() {
    this.socket = io(this._url_api_mongo);
  }

  join(id_chat: string, id_user: number){
    this.socket.emit('join_chat', id_chat, id_user);
  }

  send_message(id_chat: string, message: ImessageSerialization){
    this.socket.emit('send_new_message', id_chat, message);
  }

  on_new_message(callback: (message: ImessageSerialization) => void){
    this.socket.on('new_message', callback);
  }

  load_messages(id_chat: string, callback: (message: ImessageSerialization[]) => void){
    this.socket.emit('load_messages', id_chat);
    this.socket.on('get_messages', callback);
  }

  edit_message(id_chat: string, message: ImessageSerialization){
    this.socket.emit('edit_messages', id_chat, message);
  }

  on_edited_message(callback: (message: ImessageSerialization) => void){
    this.socket.on('edited_message', callback);
  }

  delete_message(id_chat: string, id_message: string){
    this.socket.emit('delete_message', id_chat, id_message);
  }

  on_deleted_message(callback: (id_message: string) => void){
    this.socket.on('deleted_message', callback);
  }

  on_disconect(){
    this.socket.emit('disconnect');
  }
}
