import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts/services/posts.service';
import { IPostPreview } from '../../posts/models/ipost-preview';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

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