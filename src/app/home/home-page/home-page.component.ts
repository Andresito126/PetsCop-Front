import { Component, OnInit } from '@angular/core';
import { Post } from '../../posts/models/post';
import { IpostPreview } from '../../posts/models/ipost-preview';
import { PostsService } from '../../posts/services/posts.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  constructor(private postServices: PostsService){}

  posts: IpostPreview[] = [
    /*
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
      */
  ];

  ngOnInit(): void {
    this.getRecentPost();
  }

  getRecentPost(): void{
    this.postServices.getRecentPosts().subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
        console.log(this.posts)
      },
      error => console.log("Error:", error)
    )
  }

  getOldPost(): void{
    console.log("Ontener posts antigüos")
    this.postServices.getOldPosts().subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    );
  }
}