import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLocalServicesFormComponent } from './edit-local-services-form/edit-local-services-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    EditLocalServicesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    EditLocalServicesFormComponent,
  ]
})
export class LocalesServiciosModule { }
