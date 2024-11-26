import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-chat',
  templateUrl: './view-chat.component.html',
  styleUrl: './view-chat.component.css'
})
export class ViewChatComponent implements OnInit {
  id_user: number = 0;
  id_chat_to_pass: string = "";
  chat_is_open: boolean = false;

  ngOnInit(): void {
    console.log("Leyendo usuario")
    this.get_id_user();
  }

  open_chat(id: string){
    console.log("Abriendo chat con el id:", id);
    if(this.chat_is_open){
      console.log("Cerrando chat");
      this.chat_is_open = false;
      this.id_chat_to_pass = "";
      
      console.log(this.id_chat_to_pass);
    } 
      console.log("Cambiando de cbat");
      this.id_chat_to_pass = id;
      this.chat_is_open = true;
  }

  get_id_user(){
    const getting_id = localStorage.getItem("id_user");
    this.id_user = getting_id ? JSON.parse(getting_id) : 0;
    console.log(this.id_user)
  }
}
