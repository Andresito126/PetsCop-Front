import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IPostSerialization } from '../models/ipost-serialization';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Icomments } from '../models/icomments';
import { ICommentUser } from '../comments/models/icomment-user';
import { LocalServiceService } from '../shared/components-local-service/services/local-service.service';
import { IInformationLocalService } from '../models/iinformation-local-service';
import { UserConfigurationService } from '../../users/services/user-configuration.service';

@Component({
  selector: 'app-detail-post-locals-page',
  templateUrl: './detail-post-locals-page.component.html',
  styleUrl: './detail-post-locals-page.component.css',
})
export class DetailPostLocalsPageComponent implements OnInit {
  constructor(
    private postServices: PostsService,
    private localService: LocalServiceService,
    private userService: UserConfigurationService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}

  // VARIABLES
  id_local_service: string = '';
  id_user: string  | null= localStorage.getItem('id_user');
  photos: SafeUrl [] = [];
  
  @Input() comments: Icomments[] | undefined;
  commentsUsers: ICommentUser[] = [];
  @Output() render = new EventEmitter<boolean>();

  local_service: IInformationLocalService = {
    _id: '',
    id_user: 0,
    photo_profile: '',
    photos: [],
    name: '',
    description: '',
    opening_hours: []
  }

  // MÉTODOS
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_local_servicio');

    if (id) this.id_local_service = id;

    this.getLocalService(this.id_local_service);
  }

  getLocalService(id: string): void {
    this.localService.getInformationLocalServiceById(id).subscribe(
      (response) => {
        // DEFINIMOS LOS ATRIBUTOS BÁSICOS DEL LOCAL O SERVICIO
        this.local_service._id = response._id;
        this.local_service.id_user = response.id_user;
        this.local_service.photo_profile = response.photo_profile;
        this.local_service.photos = response.photos;
        this.local_service.name = response.name;
        this.local_service.description = response.description;

        if (response.address) this.local_service.address = response.address;

        if (response.phone_number) this.local_service.phone_number = response.phone_number;

        this.local_service.opening_hours = response.opening_hours;

        if (this.comments?.length !== 0) this.local_service.comments = response.comments;
      },
      (err) => {
        console.log(err)
      }
    );
  }

   renderComponent(flag: boolean) {
    if (flag) {
      // this.updateComments();
    }
  }

  // updateComments(): void {
  //   this.postServices.getInformationPost(this.id_post).subscribe(
  //     (response) => {
  //       if (response.comments?.length !== 0) {
  //         this.post.comments = response.comments;
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
