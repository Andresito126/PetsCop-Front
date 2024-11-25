import { Component, OnInit } from '@angular/core';
import { IPostPreview } from '../../../posts/models/ipost-preview';
import { PostsService } from '../../../posts/services/posts.service';

@Component({
  selector: 'app-locals-page',
  templateUrl: './locals-page.component.html',
  styleUrl: './locals-page.component.css'
})
export class LocalsPageComponent implements OnInit{


  constructor(private postServices: PostsService){}

  posts: IPostPreview[] = [];

  ngOnInit(): void {
    this.getRecentPost();
  }

  getRecentPost(): void{
    this.postServices.getRecentPosts().subscribe(
      (response) => {
        this.posts = response;
        console.log(this.posts)
      },
      (error) => console.log("Error:", error)
    )
  }

  getOldPost(): void{
    this.postServices.getOldPosts().subscribe(
      (response) => {
        console.log("It's ok!");
        this.posts = response;
      },
      (error) => console.log("Error:", error)
    );
  } 
}
