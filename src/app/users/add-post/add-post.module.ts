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
import { FormUpdateLostComponent } from './form-update-lost/form-update-lost.component';
import { FormUpdateAdoptionComponent } from './form-update-adoption/form-update-adoption.component';
import { UpdateLostPageComponent } from './pages/update-lost-page/update-lost-page.component';
import { UpdateAdoptionPageComponent } from './pages/update-adoption-page/update-adoption-page.component';


@NgModule({
  declarations: [
    LostPageComponent,
    AdoptionPageComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    FormLostComponent,
    FormAdoptionComponent,
    FormUpdateLostComponent,
    FormUpdateAdoptionComponent,
    UpdateLostPageComponent,
    UpdateAdoptionPageComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class AddPostModule { }
