import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IUserCredentialsSerialization } from '../../../../credentials/models/iuser-credentials-serialization';
import { IUserDataSerialization } from '../../../../users/models/iuser-data-serialization';
import { UserConfigurationService } from '../../../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})
export class HeaderCardComponent implements OnChanges {
  constructor(
    private userServices: UserConfigurationService,
    private servicePost: PostsService,
    private domSanitizer: DomSanitizer
  ) {}

  // VARIABLES
  @Input() date!: string;
  @Input() time!: string;
  @Input() id_user!: number;
  type_user: string = '';
  user_name: string = '';
  profile_photo: any;
  user_normaly: IUserDataSerialization = {
    id_user_normally: 0,
    id_user: 0,
    first_name: '',
    last_name: '',
    birthdate: '',
    profile_picture: '',
  };

  ngOnChanges(): void {
    this.putUser(this.id_user);
  }

  putUser(id_user:number) {
    this.userServices.getTypeUser(id_user).subscribe(
      (response) => {
        this.type_user = response.tipo_usuario;
        this.compareUser();
      },
      (err) => {
        console.log(err)
      }
    );
  }

  compareUser(): void {
    if (this.type_user === 'Normal') {
      this.userServices.getOwnProfile(this.id_user).subscribe(
        (response) => {
          this.user_normaly = response;
          this.userServices.getOwnProfilePhoto(response.profile_picture).subscribe(
            (img_response) => {
              const imgObj = URL.createObjectURL(img_response);
              this.profile_photo = this.domSanitizer.bypassSecurityTrustUrl(imgObj);;
              this.user_name = this.user_normaly.first_name + ' ' + this.user_normaly.last_name;
            },
            (err) => {
              console.log(err)
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.servicePost.getInformationLocalService(this.id_user).subscribe(
        (response) => {
          this.user_name = response.name;
          this.userServices
            .getOwnProfilePhoto(response.photo_profile)
            .subscribe(
              (img_response) => {
                const imgObj = URL.createObjectURL(img_response);
                this.profile_photo =
                  this.domSanitizer.bypassSecurityTrustUrl(imgObj);
              },
              (error) => console.log('Error:', error)
            );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  
  }
}
