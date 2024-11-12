import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AsideComponent } from "./shared/aside/aside.component";
import { CredentialsModule } from './credentials/credentials.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    AsideComponent,
    CredentialsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
