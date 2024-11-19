import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-post-page',
  templateUrl: './detail-post-page.component.html',
  styleUrl: './detail-post-page.component.css'
})
export class DetailPostPageComponent {

  //variables


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


  ngOnInit(): void {
    
    }


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

  
}
