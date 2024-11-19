import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent  {
  // variables
  @Input() thumbnails!: string[];

 

  setMainImage(index: number) {
    // Cambiar la imagen seleccionada al inicio del array
    const [selectedImage] = this.thumbnails.splice(index, 1);
    this.thumbnails.unshift(selectedImage);
  }


}