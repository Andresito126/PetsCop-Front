import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { IPostSerialization } from '../models/ipost-serialization';
import { UserConfigurationService } from '../../users/services/user-configuration.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-post-page',
  templateUrl: './detail-post-page.component.html',
  styleUrl: './detail-post-page.component.css',
})
export class DetailPostPageComponent implements OnInit {
  constructor(
    private postServices: PostsService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}

  // VARIABLES
  id_user: string | null = '';
  id_post: string | null = '';
  date_publication: string = '';
  time_publication: string = '';
  photos: SafeUrl[] = [];
  user: string = '';

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
    this.id_user = localStorage.getItem('id_user') || null;
    this.id_post = this.route.snapshot.paramMap.get('id_post');
    this.getInformationPost();
  }

  getInformationPost(): void {
    this.postServices.getInformationPost(this.id_post).subscribe(
      (response) => {
        const type_post = response.post_type;
        // DEFINIMOS LOS DATOS BÁSICOS QUE INCLUYEN LOS DOS TIPOS DE PUBLICACIÓN
        this.post._id = response._id;
        this.post.id_user = response.id_user;

        // DEFINIMOS EL TIPO DE PUBLICACIÓN EN ESPAÑOL
        if (type_post === 'Lost'){
          this.post.post_type = 'Perdido';
        } else if (type_post === 'Adoption') {
          this.post.post_type = 'Adopción';
        } else {
          this.post.post_type = 'Encontrado';
        }
        
        this.post.basic_pet_information = response.basic_pet_information;

        const publicationDate = new Date(this.post.publication_date);
        this.date_publication = publicationDate.toISOString().split('T')[0];
        this.time_publication = publicationDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        if (response.comments?.length !== 0)
          this.post.comments = response.comments;

        if (type_post === 'Adoption') {
          this.post.medical_data = response.medical_data;
        } else if (type_post === 'Lost') {
          this.post.loss_data = response.loss_data;
          this.post.reward = response.reward;
        } else {
          this.post.gratitude = response.gratitude;
        }

        response.basic_pet_information.photos.forEach(img => {
          this.postServices.getPhotosFromMongo(img).subscribe(
            (response) => {
              const img = URL.createObjectURL(response);
              this.photos.push(this.domSanitizer.bypassSecurityTrustUrl(img));
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // BOTÓN PARA CARACTERÍSTICAS O DATOS BÁSICOS
  selectedButton: string = 'datos';

  selectButton(button: string): void {
    this.selectedButton = button;
  }

  updateComments(): void {
    this.postServices.getInformationPost(this.id_post).subscribe(
      (response) => {
        if (response.comments?.length !== 0) {
          this.post.comments = response.comments;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  renderComponent(flag: boolean) {
    if (flag) {
      this.updateComments();
    }
  }
}
