import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { IpostPreview } from '../models/ipost-preview';

@Component({
  selector: 'app-card-post-page',
  templateUrl: './card-post-page.component.html',
  styleUrl: './card-post-page.component.css'
})
export class CardPostPageComponent implements OnInit {
  @Input() posts: IpostPreview = {
    _id: "",
    id_user: 0,
    post_type: "",
    basic_pet_information: {
      type_pet: "",
      name: "",
      race: "",
      age: "",
      main_physical_characteristics: [],
      photos: []
    },
    publication_date: new Date
  }; 

  date_publication: string = "";
  time_publication: string = "";

  ngOnInit(): void {
      this.date_publication = this.posts.publication_date.toISOString().split('T')[0];
      this.time_publication = this.posts.publication_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }
}
