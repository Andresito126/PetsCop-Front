import { NgModule, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewChatComponent } from './view-chat/view-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { MessagesChatComponent } from './messages-chat/messages-chat.component';



@NgModule({
  declarations: [
    ViewChatComponent,
    ChatListComponent,
    MessagesChatComponent
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
