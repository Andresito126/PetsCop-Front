import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts/services/posts.service';
import { IPostPreview } from '../../posts/models/ipost-preview';

@Component({
  selector: 'app-perdidos-page',
  templateUrl: './perdidos-page.component.html',
  styleUrl: './perdidos-page.component.css'
})
export class PerdidosPageComponent implements OnInit {
  constructor(private postServices: PostsService){}

  posts: IPostPreview[] = [
    
  ];

  ngOnInit(): void {
    this.getRecentPost();
  }

  getRecentPost(): void{
    console.log("Obtener posts recientes")
    this.postServices.getRecentPostOfAType("Lost").subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    )
  }

  getOldPost(): void{
    console.log("Ontener posts antigüos")
    this.postServices.getOldPostOfAType("Lost").subscribe(
      response => {
        console.log("It's ok!");
        this.posts = response;
      },
      error => console.log("Error:", error)
    );
  }

}
