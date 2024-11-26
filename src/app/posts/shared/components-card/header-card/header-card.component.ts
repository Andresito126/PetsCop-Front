import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IUserCredentialsSerialization } from '../../../../credentials/models/iuser-credentials-serialization';
import { IUserDataSerialization } from '../../../../users/models/iuser-data-serialization';
import { UserConfigurationService } from '../../../../users/services/user-configuration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostsService } from '../../../services/posts.service';
import { ChatService } from '../../../../chat/services/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})
export class HeaderCardComponent implements OnChanges {
  constructor(
    private userServices: UserConfigurationService,
    private servicePost: PostsService,
    private domSanitizer: DomSanitizer,
    private chatServices: ChatService,
    private router: Router,
  ) {}

  // VARIABLES
  @Input() id_user!: number;

  @Input() showInfoLocal: boolean=false
  @Input() showInfoData: boolean=false
  @Input() time = '';
  @Input() date = '';

  type_user: string = '';
  user_name: string = '';
  profile_photo: any;



  own_id_user: number = 0;

  user_normaly: IUserDataSerialization = {
    id_user_normally: 0,
    id_user: 0,
    first_name: '',
    last_name: '',
    birthdate: '',
    profile_picture: '',
  };

  // MÉTODOS
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

  init_chat(){
    const getting_id = localStorage.getItem("id_user");
    this.own_id_user = getting_id ? JSON.parse(getting_id) : 0;

    this.chatServices.init_chat(this.own_id_user, this.id_user).subscribe(
      (response) => {
        console.log("Iniciando chat:", response)
        Swal.fire({
          icon: "success",
          title: "Chat inicializado",
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.router.navigate(['/chat']));
        // this.router.navigate(["/chat"]);
      },
      (error) => {
        console.log("Error:", error);
        Swal.fire({
          title: "Chat existente",
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.router.navigate(['/chat']));
        // this.router.navigate(["/chat"]);
      }
    );
  }
}
