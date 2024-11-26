import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../posts/services/posts.service';
import { ILocalService } from '../../models/ilocal-service-serialization';
import { LocalServiceService } from '../../../posts/shared/components-local-service/services/local-service.service';

@Component({
  selector: 'app-locals-page',
  templateUrl: './locals-page.component.html',
  styleUrl: './locals-page.component.css',
})
export class LocalsPageComponent implements OnInit {
  constructor(
    private localServices: LocalServiceService,
  ) {}

  // VARIABLES
  local_services: ILocalService[] = [];

  // MÉTODOS
  ngOnInit(): void {
    this.getLocalServices();
  }

  getLocalServices(): void {
    this.localServices.getAllLocalServices().subscribe(
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
