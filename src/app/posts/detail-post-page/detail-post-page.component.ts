import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { IPostSerialization } from '../models/ipost-serialization';

@Component({
  selector: 'app-detail-post-page',
  templateUrl: './detail-post-page.component.html',
  styleUrl: './detail-post-page.component.css',
})
export class DetailPostPageComponent implements OnInit {
  constructor(
    private servicePost: PostsService,
    private route: ActivatedRoute
  ) {}

  // VARIABLES
  id_post: string | null = '';
  date_publication: string = '';
  time_publication: string = '';
  photo: string = '';

  post: IPostSerialization = {
    _id: '',
    id_user: 0,
    post_type: '',
    basic_pet_information: {
      type_pet: '',
      name: '',
      race: '',
      age: '',
      main_physical_characteristics: [],
      photos: [],
    },
    publication_date: new Date(),
  };


  // MÉTODOS
  ngOnInit(): void {
    this.id_post = this.route.snapshot.paramMap.get('id_post');
    this.getInformationPost();
  }

  getInformationPost(): void {
    this.servicePost.getInformationPost(this.id_post).subscribe(
      (response) => {
        if (response.status === 200) {
          // DEFINIMOS LOS DATOS BÁSICOS QUE INCLUYEN LOS DOS TIPOS DE PUBLICACIÓN
          this.post._id = response._id;
          this.post.id_user = response.id_user;
          this.post.post_type = response.post_type;
          this.post.basic_pet_information = response.basic_pet_information;

          const publicationDate = new Date(this.post.publication_date);
          this.date_publication = publicationDate.toISOString().split('T')[0];
          this.time_publication = publicationDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });

          if (response.comments?.length !== 0) this.post.comments = response.comments;

          this.servicePost.getInformationUser(this.post.id_user).subscribe(
            (res) => {  },
            (err) => {}
          );
        }
      },
      (err) => {}
    );
  }

  //boton carcateristicas o datos basicos
  selectedButton: string = 'datos';

  selectButton(button: string): void {
    this.selectedButton = button;
  }
}
