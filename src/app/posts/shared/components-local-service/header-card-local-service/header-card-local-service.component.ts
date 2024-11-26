import { Component, Input } from '@angular/core';
import { UserConfigurationService } from '../../../../users/services/user-configuration.service';
import { PostsService } from '../../../services/posts.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocalServiceService } from '../services/local-service.service';

@Component({
  selector: 'app-header-card-local-service',
  templateUrl: './header-card-local-service.component.html',
  styleUrl: './header-card-local-service.component.css',
})
export class HeaderCardLocalServiceComponent {
  constructor(
    private userServices: UserConfigurationService,
    private servicePost: PostsService,
    private localService: LocalServiceService, 
    private domSanitizer: DomSanitizer
  ) {}

  // VARIABLES
  @Input() id_user!: number;

  user_name: string = '';
  profile_photo: any;

  // MÉTODOS
  ngOnChanges(): void {
    this.getInformationLoalService(this.id_user);
  }

  getInformationLoalService(id_user: number) {
    this.localService.getInformationLocalService(id_user).subscribe(
      (response) => {
        this.user_name = response.name;
        this.downloadPhoto(response.photo_profile)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  downloadPhoto(url: string): void {
    this.userServices.getOwnProfilePhoto(url).subscribe(
      (img_response) => {
        const imgObj = URL.createObjectURL(img_response);
        this.profile_photo = this.domSanitizer.bypassSecurityTrustUrl(imgObj);
      },
      (error) => console.log('Error:', error)
    );
  }
}
