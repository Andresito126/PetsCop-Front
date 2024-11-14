import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AsideComponent } from "./shared/aside/aside.component";
import { CredentialsModule } from './credentials/credentials.module';
import { UsersModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    NavbarComponent,
    AsideComponent,
    CredentialsModule,
    HttpClientModule,
    HomeModule
  ],
   

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
