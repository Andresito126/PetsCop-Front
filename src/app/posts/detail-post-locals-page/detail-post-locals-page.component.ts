import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IPostSerialization } from '../models/ipost-serialization';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Icomments } from '../models/icomments';
import { ICommentUser } from '../comments/models/icomment-user';

@Component({
  selector: 'app-detail-post-locals-page',
  templateUrl: './detail-post-locals-page.component.html',
  styleUrl: './detail-post-locals-page.component.css'
})
export class DetailPostLocalsPageComponent implements OnInit {
  constructor(
    private postServices: PostsService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}


    // VARIABLES
  id_user: string | null = '';
  id_post: string | null = '';
  date_publication: string = '';
  time_publication: string = '';
  photos: SafeUrl[] = [];
  user: string = '';

  @Input() comments: Icomments[] | undefined;
  commentsUsers: ICommentUser[] = [];
  @Input() id_user2: any;
  @Input() id_post2: string = '';
  @Output() render = new EventEmitter<boolean>();

  post: IPostSerialization = {
    _id: '',
    id_user: 0,
    post_type: '',
    basic_pet_information: {
      type_pet: '',
      name: '',
      race: '',
      age: '',
      main_physical_characteristics: [],
      photos: [],
    },
    publication_date: new Date(),
  };


  simulador ={
    id_user: 1,
    id_post: '1',   
    date_publication: '22/11/23',
    time_publication: '11:23 pm',
    photos:["assets/posts/alertAdoption.svg","assets/posts/alertAdoption.svg"],
    nameLocalS:"EL mero pet pap",
    colonia: "El 5 de mayo gratis 2",
    description:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas , las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
  
  }

 
 
   



    // MÉTODOS
    ngOnInit(): void {
      this.id_user = localStorage.getItem('id_user') || null;
      this.id_post = this.route.snapshot.paramMap.get('id_post');
      
    }
  
    renderComponent(flag: boolean) {
      if (flag) {
        this.updateComments();
      }
    }

    
  updateComments(): void {
    this.postServices.getInformationPost(this.id_post).subscribe(
      (response) => {
        if (response.comments?.length !== 0) {
          this.post.comments = response.comments;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
