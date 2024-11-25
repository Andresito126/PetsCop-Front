import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../posts/services/posts.service';
import { ILocalService } from '../../models/ilocal-service-serialization';

@Component({
  selector: 'app-locals-page',
  templateUrl: './locals-page.component.html',
  styleUrl: './locals-page.component.css',
})
export class LocalsPageComponent implements OnInit {
  constructor(
    private postServices: PostsService,
  ) {}

  // VARIABLES
  local_services: ILocalService[] = [];

  // MÉTODOS
  ngOnInit(): void {
    this.getLocalServices();
  }

  getLocalServices(): void {
    this.postServices.getAllLocalServices().subscribe(
      (response) => {
        console.log(response)
        this.local_services = response;
      },
      (err) => {
        console.log(err)
      }
    );
  }
}
