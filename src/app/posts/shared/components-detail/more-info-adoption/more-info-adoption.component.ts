import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-more-info-adoption',
  templateUrl: './more-info-adoption.component.html',
  styleUrl: './more-info-adoption.component.css'
})
export class MoreInfoAdoptionComponent implements OnInit{
  constructor(private postServices: PostsService, private domSanitizer: DomSanitizer){}

  @Input() physical_problems: string[] | undefined;
  @Input() operations: string | null | undefined;
  @Input() primer: string | undefined  = '';
  img: SafeUrl = '';

  ngOnInit(): void {
    this.uploadImg();
  }

  uploadImg(): void {
    this.postServices.getPhotosFromMongo(this.primer).subscribe(
      (response) => {
        const img = URL.createObjectURL(response);
        this.img = this.domSanitizer.bypassSecurityTrustUrl(img);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
