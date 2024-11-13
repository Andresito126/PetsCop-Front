import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReusableFormComponent } from './reusable-form/reusable-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChooseUserComponent } from './choose-user/choose-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ReusableFormComponent,
    ChooseUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CredentialsModule { }
