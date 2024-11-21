import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { IpostPreview } from '../models/ipost-preview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-post-page',
  templateUrl: './card-post-page.component.html',
  styleUrl: './card-post-page.component.css'
})
export class CardPostPageComponent implements OnInit {
  constructor(private router: Router){}

  // VARIABLES
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
    loss_data: {
      address: {
        zip_code: 0,
        state: "",
        street: "",
        colony: "",
        municipality: "",
        outside_number: 0
      },
      loss_date: new Date,
      description: "",
      last_seen: ""
    },
    reward: 0,
    gratitude: "",
    publication_date: new Date
  }; 

  date_publication: string = "";
  time_publication: string = "";

  // MÉTODOS
  ngOnInit(): void {
    const publicationDate = new Date(this.posts.publication_date);
    this.date_publication = publicationDate.toISOString().split('T')[0];
    this.time_publication = publicationDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
  }

  redirectDetailPost(): void {
    this.router.navigate(['/detallePost', this.posts._id]);
  }
}
