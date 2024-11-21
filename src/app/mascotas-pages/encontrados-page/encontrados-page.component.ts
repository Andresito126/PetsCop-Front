import { Component } from '@angular/core';
import { PostsService } from '../../posts/services/posts.service';
import { IPostPreview } from '../../posts/models/ipost-preview';

@Component({
  selector: 'app-encontrados-page',
  templateUrl: './encontrados-page.component.html',
  styleUrl: './encontrados-page.component.css'
})
export class EncontradosPageComponent {
  constructor(private postServices: PostsService){}

  posts: IPostPreview[] = [];

  ngOnInit(): void {
    this.getRecentPost();
  }

  getRecentPost(): void{
    this.postServices.getRecentPostOfAType("Encontrado").subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => console.log("Error:", error)
    )
  }

  getOldPost(): void{
    this.postServices.getOldPostOfAType("Encontrado").subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => console.log("Error:", error)
    );
  }
}
