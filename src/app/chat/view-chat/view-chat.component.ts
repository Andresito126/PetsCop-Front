import { Component } from '@angular/core';

@Component({
  selector: 'app-view-chat',
  templateUrl: './view-chat.component.html',
  styleUrl: './view-chat.component.css'
})
export class ViewChatComponent {
  id_user: number = 0;

  constructor(){}

  get_id_user(){
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;
  }
}
