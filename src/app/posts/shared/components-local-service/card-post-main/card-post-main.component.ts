import { Component, Input } from '@angular/core';
import { Pet } from '../../../models/pet';
import { IlocalServicePost } from '../../../models/ilocal-service-post';
import { PostsService } from '../../../services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IlossData } from '../../../models/iloss-data';
@Component({
  selector: 'app-card-post-main',
  templateUrl: './card-post-main.component.html',
  styleUrl: './card-post-main.component.css'
})
export class CardPostMainComponent {
  constructor(
    private postServices: PostsService,
    private domSanitizer: DomSanitizer
  ){}

  // VARIABLES
  @Input() postLocal!: IlocalServicePost;


  @Input() description!: string;
  @Input() lost_data!: IlossData | undefined;
  @Input() reward: number | undefined;
  @Input() gratitude: string | undefined;
  @Input() pet!: Pet;
  @Input() type_post!: string;
  @Input() images!: string[];
  @Input() post!: Pet;


  imagenes: any[] = [];

  ngOnInit(): void {
    this.getPhotos();
  }
  
  getPhotos(){
    for(let i:number = 0; i < 3; i++){
      this.postServices.getPhotosFromMongo(this.images[i]).subscribe(
        response => {
          const img = URL.createObjectURL(response);
          this.imagenes.push(this.domSanitizer.bypassSecurityTrustUrl(img));
        },
        error => console.log("Error:", error)
      )
    }
  }
}
