import { Component } from '@angular/core';
import { IpostPreview } from '../../posts/models/ipost-preview';
import { PostsService } from '../../posts/services/posts.service';

@Component({
  selector: 'app-encontrados-page',
  templateUrl: './encontrados-page.component.html',
  styleUrl: './encontrados-page.component.css'
})
export class EncontradosPageComponent {
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
    this.postServices.getRecentPostOfAType("Found").subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    )
  }

  getOldPost(): void{
    console.log("Ontener posts antigüos")
    this.postServices.getOldPostOfAType("Found").subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    );
  }
}
