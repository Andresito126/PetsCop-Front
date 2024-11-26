import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AsideComponent } from "./shared/aside/aside.component";
import { CredentialsModule } from './credentials/credentials.module';
import { UsersModule } from './users/users.module';
import { PostTypeModalComponent } from './shared/modals/post-type-modal/post-type-modal.component';
import { HomeModule } from './home/home.module';
import { PostsModule } from './posts/posts.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './shared/services/jwt-interceptor.service';

import { MascotasPagesModule } from './mascotas-pages/mascotas-pages.module';

import { LocalServicesModule } from './local-services/local-services.module';


import { ChatModule } from './chat/chat.module';



import { LocalesServiciosModule } from './locales-servicios/locales-servicios.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    NavbarComponent,
    AsideComponent,
    PostTypeModalComponent,
    CredentialsModule,
    HttpClientModule,
    RouterModule,
    HomeModule,
    PostsModule,
    MascotasPagesModule,
    LocalServicesModule,
    ChatModule,


    LocalesServiciosModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
