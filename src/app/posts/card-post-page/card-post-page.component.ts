import { Component, Input } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-card-post-page',
  templateUrl: './card-post-page.component.html',
  styleUrl: './card-post-page.component.css'
})
export class CardPostPageComponent {
  @Input() posts: Post[] = []; 
}
