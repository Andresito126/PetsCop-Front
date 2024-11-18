import { Component, OnInit } from '@angular/core';
import { Post } from '../../posts/models/post';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  posts: Post[] = [];


  ngOnInit(): void {
    
    this.posts = [
      {
        user: 'cahrlydick',
        date: '2024-11-18',
        time:'12:20',
        location: 'mecivo',
        pet: { name: 'Buddy', gender: 'Macho', status: 'Perdido' },
        description: 'Se busca mi perrito',
        images: ['assets/posts/', 'assets/posts/.jpg'],
      },
      {
        user: 'Kevin Jr',
        date: '2024-11-17',
        time:'12:20',
        location: 'Chiapas',
        pet: { name: 'Lucilia', gender: 'Macho', status: 'Encontrado' },
        description: 'ta boniyo',
        images: ['assets/posts/.jpg'],
      },
    ];
  }
}