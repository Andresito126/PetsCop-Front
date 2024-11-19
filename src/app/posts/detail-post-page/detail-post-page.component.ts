import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-post-page',
  templateUrl: './detail-post-page.component.html',
  styleUrl: './detail-post-page.component.css'
})
export class DetailPostPageComponent implements OnInit {

  constructor (private servicePost: PostsService, private route: ActivatedRoute) {}

  // VARIABLES
  id_post: number = 0;

  // MÉTODOS
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_post');

    if (id) {
      this.id_post = +id;
      this.getInformationPost(this.id_post);
    }
  }
  
  getInformationPost(id_post: number): void {

  }

  //interfaz, datos semi dinamicos
  kevPost = {
    postDetails: {
      postId: 'abc123',
      owner: 'Andre Julian Gutiérrez Alcazar',
      date: '24/10/2024 10:12',
    },
    images: {
      thumbnails: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300/111',
        'https://via.placeholder.com/300/222',
        'https://via.placeholder.com/300/300',

      ],
    },
    petInfo: {
      name: 'Yago',
      status: 'Encontrado',
      sex: 'male',
      age: '1 año y 4 meses',
      breed: 'Chihuahua',
    },
    eventDescription: {
      description:
        'Yago es un bromista que se lleva bien con todos - ¡perros y humanos por igual! Es atlético y juguetón, pero también sabe cuándo es hora de descansar.',
      reward: 700,
    },
    location: {
      state: 'Chiapas',
      municipality: 'Ocozocoautla de Espinoza',
      neighborhood: 'México 13 de Mayo',
      lastSeen: 'Frente al DIF',
    },
    comments: [
      {
        userName: 'John Doe',
        comment: 'Espero que encuentres a Yago pronto.',
        dateCommented: '24/10/2024 12:30',
      },
      {
        userName: 'Jane Smith',
        comment: '¡Qué lindo perrito! Ojalá regrese a casa.',
        dateCommented: '24/10/2024 13:15',
      },
    ],
  };


  


  thumbnails = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300/111',
    'https://via.placeholder.com/300/222',
    'https://via.placeholder.com/300/333'
  ];

  //boton carcateristicas o datos basicos
  selectedButton: string = 'datos';

  selectButton(button: string): void {
    this.selectedButton = button;
  }

  date_publication: string = "";
  time_publication: string = "";

  // ngOnInit(): void {
  //   const publicationDate = new Date(this.posts.publication_date);
  //   this.date_publication = publicationDate.toISOString().split('T')[0];
  //   this.time_publication = publicationDate.toLocaleTimeString('en-US', { 
  //     hour: '2-digit', 
  //     minute: '2-digit', 
  //     second: '2-digit', 
  //     hour12: false 
  //   });
  // }

  
}
