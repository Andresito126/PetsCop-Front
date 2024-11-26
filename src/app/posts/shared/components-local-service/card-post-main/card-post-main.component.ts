import { Component, Input, OnChanges } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IlossData } from '../../../models/iloss-data';
import { ILocalService } from '../../../../local-services/models/ilocal-service-serialization';
import { UserConfigurationService } from '../../../../users/services/user-configuration.service';
@Component({
  selector: 'app-card-post-main',
  templateUrl: './card-post-main.component.html',
  styleUrl: './card-post-main.component.css'
})
export class CardPostMainComponent implements OnChanges{
  constructor(
    private postServices: PostsService,
    private userService: UserConfigurationService,
    private domSanitizer: DomSanitizer
  ){}

  // VARIABLES
  @Input() localService: ILocalService = {
    _id: '',
    id_user: 0,
    photo_profile: '',
    photos: [],
    name: '',
    description: ''
  }

  imgs: (string | SafeUrl) [] = []

  type_user: string = '';

  // MÉTODOS
  ngOnChanges(): void {
    this.getTypeUser();
    this.assignImgs();
  }

  getTypeUser(): void {
    this.userService.getTypeUser(this.localService.id_user).subscribe(
      (response) => {
        this.type_user = response.tipo_usuario;
      },
      (err) => {
        console.log(err)
      }
    );
  }

  assignImgs(): void {
    this.localService.photos.forEach((photo, index) => {
      this.postServices.getPhotosFromMongo(photo).subscribe(
        (response) => {
          const img = URL.createObjectURL(response);
          this.imgs[index] = this.domSanitizer.bypassSecurityTrustUrl(img);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

}
