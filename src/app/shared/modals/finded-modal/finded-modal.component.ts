import { CommonModule } from '@angular/common';
import { Component , Output, EventEmitter, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../users/services/post.service';
import { PostsService } from '../../../posts/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finded-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finded-modal.component.html',
  styleUrl: './finded-modal.component.css'
})
export class FindedModalComponent {

  @Input() id_post: string | null = "";
  message: string = "";

  petFindedModal: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor(private postServices: PostsService){}

  closeFindedModal(): void {
    this.close.emit();
  }

  sendFindedModal(): void {
    if(this.id_post && this.message){
      this.postServices.pass_post_of_lost_to_found(this.id_post, this.message).subscribe(
        response => {
          console.log("Agradecimiento enviado:", response);
          Swal.fire({
            icon: "success",
            title: "Post actualizado a 'encontrado'",
            showConfirmButton: false,
            timer: 2500
          })
          this.confirm.emit();
        },
        error => {
          console.log("Error:", error)
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el post",
            showConfirmButton: false,
            timer: 2500
          })
        }
      )
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar el post",
        showConfirmButton: false,
        timer: 2500
      })
    }
    
  }
}
