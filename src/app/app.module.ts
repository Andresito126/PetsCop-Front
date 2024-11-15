import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AsideComponent } from "./shared/aside/aside.component";
import { UsersModule } from './users/users.module';
import { PostTypeModalComponent } from './shared/modals/post-type-modal/post-type-modal.component';


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
    PostTypeModalComponent
  ],
   
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
