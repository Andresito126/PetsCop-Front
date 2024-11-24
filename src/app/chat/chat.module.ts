import { NgModule, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewChatComponent } from './view-chat/view-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { MessagesChatComponent } from './messages-chat/messages-chat.component';
import { CardContactComponent } from './card-contact/card-contact.component';
import { InputNewMessageComponent } from './input-new-message/input-new-message.component';
import { MessageComponent } from './message/message.component';
import { InputEditMessageComponent } from './input-edit-message/input-edit-message.component';



@NgModule({
  declarations: [
    ViewChatComponent,
    ChatListComponent,
    MessagesChatComponent,
    CardContactComponent,
    InputNewMessageComponent,
    MessageComponent,
    InputEditMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ViewChatComponent,
  ],
})
export class ChatModule { }
