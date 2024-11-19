import { Component } from '@angular/core';
import { PostsService } from '../../posts/services/posts.service';
import { IpostPreview } from '../../posts/models/ipost-preview';

@Component({
  selector: 'app-adopcion-page',
  templateUrl: './adopcion-page.component.html',
  styleUrl: './adopcion-page.component.css'
})
export class AdopcionPageComponent {
  constructor(private postServices: PostsService){}

  posts: IpostPreview[] = [
    {
      _id: "id",
      id_user: 9,
      post_type: "Adoption",
      basic_pet_information: {
        type_pet: "Perro",
        name: "Niky",
        race: "Chihuahua",
        age: "1 año",
        main_physical_characteristics: ["Venadita", "Chiquitita"],
        photos: []
      },
      publication_date: new Date
    }
  ];

  ngOnInit(): void {
    this.getRecentPost();
  }

  getRecentPost(): void{
    console.log("Obtener posts recientes")
    this.postServices.getRecentPostOfAType("Adoption").subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    )
  }

  getOldPost(): void{
    console.log("Ontener posts antigüos")
    this.postServices.getOldPostOfAType("Adoption").subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    );
  }
}
