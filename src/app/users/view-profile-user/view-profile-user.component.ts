import { Component, OnInit } from '@angular/core';
import { IpostPreview } from '../../posts/models/ipost-preview';
import { PostsService } from '../../posts/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile-user',
  templateUrl: './view-profile-user.component.html',
  styleUrl: './view-profile-user.component.css'
})
export class ViewProfileUserComponent implements OnInit {

  constructor(
    private postServices: PostsService,
    private route: ActivatedRoute
  ){}

  id_user_show: number = 9;
  
  post_user: IpostPreview[] = []

  ngOnInit(): void {
      this.obtainIdUser();
  }

  obtainIdUser(){
    // Lógica para extraer el id del usuario a la hora de dirigirse a esta vista
    this.id_user_show = +this.route.snapshot.paramMap.get('id_user')!;
    console.log(this.id_user_show)
    this.obtainPosts();
  }

  obtainPosts(){
    this.postServices.getPostOfAnUser(this.id_user_show).subscribe(
      response => {
        console.log("All is ok!");
        this.post_user = response;
      },
      error => console.log("Error:", error)
    );
  }
}
