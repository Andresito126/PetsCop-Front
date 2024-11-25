import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IlocalServicePost } from '../models/ilocal-service-post';
@Component({
  selector: 'app-card-posts-locals-page',
  templateUrl: './card-posts-locals-page.component.html',
  styleUrl: './card-posts-locals-page.component.css'
})
export class CardPostsLocalsPageComponent {

  constructor(private router: Router){}

  //VARIABLE
  @Input()postLocal: IlocalServicePost = {
    _id : "",
    id_user: 0,
    data: {
      name: "",
    photo_profile: "",
    },
    description: "",

  }

  
  redirectDetailPost(): void {
    this.router.navigate(['/detallePost']);
    // this.router.navigate(['/detallePost', this.post._id]);
  }
}
