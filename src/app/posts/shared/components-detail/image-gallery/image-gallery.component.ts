import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ChatService } from '../../../../chat/services/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent  {
  // variables
  @Input() thumbnails!: SafeUrl[];
  @Input() id_user: number = 0;
  own_id_user: number = 0;

  constructor(
    private chatServices: ChatService,
    private router: Router
  ){}

  setMainImage(index: number) {
    // Cambiar la imagen seleccionada al inicio del array
    const [selectedImage] = this.thumbnails.splice(index, 1);
    this.thumbnails.unshift(selectedImage);
  }

  init_chat(){
    const getting_id = localStorage.getItem("id_user");
    this.own_id_user = getting_id ? JSON.parse(getting_id) : 0;

    this.chatServices.init_chat(this.own_id_user, this.id_user).subscribe(
      (response) => {
        console.log("Iniciando chat:", response)
        Swal.fire({
          icon: "success",
          title: "Chat inicializado",
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.router.navigate(['/chat']));
        // this.router.navigate(["/chat"]);
      },
      (error) => {
        console.log("Error:", error);
        Swal.fire({
          title: "Chat existente",
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.router.navigate(['/chat']));
        // this.router.navigate(["/chat"]);
      }
    );
  }
}