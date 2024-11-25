import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lost-page',
  templateUrl: './lost-page.component.html',
  styleUrl: './lost-page.component.css'
})
export class LostPageComponent {
  // VARIABLES
  formType: 'adopcion' | 'perdida' = 'perdida';
  currentStep: number = 1;
  form: string = '';

  // VARIABLES IMÁGENES
  mainPlaceholderIcon = '/assets/img/default-main-icon.png';
  additionalPlaceholderIcons = ['/assets/img/default-additional-icon1.png', '/assets/img/default-additional-icon2.png'];  

  // MÉTODOS
  onFormSubmit(formType: string) {
    console.log(`${formType} enviado`);
  }
  
}
