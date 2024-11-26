import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnChanges {

  constructor (private photoService: PostsService, private domSantizer: DomSanitizer) {}

  // VARIABLES
  @Input() thumbnails: (string | SafeUrl) [] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Imagenes recibidas: " + this.thumbnails)
    this.convertUrlImgsToSafeUrl();
  }

  setMainImage(index: number) {
    // Cambiar la imagen seleccionada al inicio del array
    const [selectedImage] = this.thumbnails.splice(index, 1);
    this.thumbnails.unshift(selectedImage);
  }

  convertUrlImgsToSafeUrl(): void {
    this.thumbnails.forEach((url, index) => {
      this.photoService.getPhotosFromMongo(url).subscribe(
        (response) => {
          const img = URL.createObjectURL(response);
          this.thumbnails[index] = this.domSantizer.bypassSecurityTrustUrl(img);
        },
        (err) => {
          console.log(err);
        }
      );
    });

    console.log(this.thumbnails)
  }


}