import { Component } from '@angular/core';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  username: string = "Kevin Jimmy Jimenez Pérez";

  cantidad_de_posts: number = 6;

  foto_de_perfil: string = "https://imgs.search.brave.com/fSqgj4P4KpO1RlRKvEszUfdJ-cK3aM4mGnYz-KtJxJA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjQ0/NDMwOTE0L2VzL2Zv/dG8vcmV0cmF0by1k/ZS1tdWplci1kZS1u/ZWdvY2lvcy10aXBv/LWVzdHVkaW8uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTZ4/Q3RRLXhqb1VxRUxz/LW50ZG1aZXppUjZL/RHZZdWlBYmdlZE9X/RUtjWWc9";
}
