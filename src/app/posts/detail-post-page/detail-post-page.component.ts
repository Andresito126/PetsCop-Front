import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-post-page',
  templateUrl: './detail-post-page.component.html',
  styleUrl: './detail-post-page.component.css'
})
export class DetailPostPageComponent {

  thumbnails = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300/111',
    'https://via.placeholder.com/300/222',
    'https://via.placeholder.com/300/333'
  ];

  // Imagen principal inicial
  mainImage = this.thumbnails[0];

  // Cambiar la imagen principal
  setMainImage(image: string) {
    this.mainImage = image;
  }
  
}
