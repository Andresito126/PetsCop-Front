import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostPageComponent } from './pages/lost-page/lost-page.component';
import { AdoptionPageComponent } from './pages/adoption-page/adoption-page.component';
import { Step2Component } from './form-step/step2/step2.component';
import { Step3Component } from './form-step/step3/step3.component';
import { Step1Component } from './form-step/step1/step1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLostComponent } from './form-lost/form-lost.component';
import { FormAdoptionComponent } from './form-adoption/form-adoption.component';


@NgModule({
  declarations: [
    LostPageComponent,
    AdoptionPageComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    FormLostComponent,
    FormAdoptionComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class AddPostModule { }
