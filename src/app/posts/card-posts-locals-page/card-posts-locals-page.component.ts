import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ILocalService } from '../../local-services/models/ilocal-service-serialization';
@Component({
  selector: 'app-card-posts-locals-page',
  templateUrl: './card-posts-locals-page.component.html',
  styleUrl: './card-posts-locals-page.component.css'
})
export class CardPostsLocalsPageComponent {

  constructor(private router: Router){}

  // VARIABLES
  @Input() localService: ILocalService = {
    _id: '',
    id_user: 0,
    photo_profile: '',
    photos: [],
    name: '',
    description: ''
  }

  redirectDetailPost(): void {
    this.router.navigate(['/detalleLocalServicio', this.localService._id]);
  }

}
