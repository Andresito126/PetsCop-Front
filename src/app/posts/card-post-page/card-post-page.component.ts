import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPostPreview } from '../models/ipost-preview';

@Component({
  selector: 'app-card-post-page',
  templateUrl: './card-post-page.component.html',
  styleUrl: './card-post-page.component.css'
})
export class CardPostPageComponent implements OnInit {
  constructor(private router: Router){}

  // VARIABLES
  @Input() post: IPostPreview = {
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
  @Input() isHome: boolean = false;


  date_publication: string = "";
  time_publication: string = "";

  // MÉTODOS
  ngOnInit(): void {
    const publicationDate = new Date(this.post.publication_date);
    this.date_publication = publicationDate.toISOString().split('T')[0];
    this.time_publication = publicationDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
  }

  redirectDetailPost(): void {
    this.router.navigate(['/detallePost', this.post._id]);
  }
}
