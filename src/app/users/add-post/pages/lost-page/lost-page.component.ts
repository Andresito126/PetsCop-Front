import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lost-page',
  templateUrl: './lost-page.component.html',
  styleUrl: './lost-page.component.css'
})
export class LostPageComponent implements OnInit {

  constructor (private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments[0].path === 'crear-publicacion-perdida') {
        this.form = 'crear-publicacion-perdida';
      } else if (urlSegments[0].path === 'actualizar-publicacion-perdida') {
        this.form = 'actualizar-publicacion-perdida';
      }
    });
  }


  // VARIABLES
  formType: 'adopcion' | 'perdida' = 'perdida';
  currentStep: number = 1;
  form: string = '';

  fields = [
    // CAMPOS PERRO
    { label: 'Tipo de mascota', type: 'select', name: 'pet-type', placeholder: 'Selecciona a tu mascota', required: true, options: [{ label: 'Perro', value: 'perro' }, { label: 'Gato', value: 'gato' }] },
    { label: 'Raza', type: 'select', name: 'pet-breed', placeholder: 'Selecciona la raza de tu mascota', required: true, options: [{ label: 'Pug', value: 'pug' }, { label: 'jej', value: 'jej' }] },
    { label: 'Nombre de la mascota', type: 'text', name: 'pet-name', placeholder: 'Ingresa el nombre de tu mascota', required: true },
    { label: 'Edad', type: 'number', name: 'pet-age', placeholder: 'Edad de tu mascota', required: true },
    // CAMPOS DE DIRECCIÓN
    { label: 'Código postal', type: 'number', name: 'zip-code', placeholder: 'Ingresa tu código postal', required: true },
    { label: 'Estado', type: 'text', name: 'state', placeholder: 'Tu estado', required: true, disabled:true },
    { label: 'Municipio', type: 'text', name: 'municipality', placeholder: 'Tu municipio', required: true, disabled:true },
    { label: 'Colonia', type: 'text', name: 'neighborhood', placeholder: 'Tu colonia', required: true },
    { label: 'Fecha en que se perdió', type: 'date', name: 'date_lost', placeholder: 'Fecha de perdida ', required: true },
    { label: 'Descripción', type: 'text', name: 'description', placeholder: 'Pequeña descripción ', required: true },
    { label: 'Lugar de la ultima vez visto', type: 'text', name: 'last_seen', placeholder: 'Ultima vez que lo viste ', required: true },
    { label: 'Recompensa', type: 'number', name: 'reward', placeholder: '¿Recompensa? ', required: true },
  ];

  // VARIABLES IMÁGENES
  mainPlaceholderIcon = '/assets/img/default-main-icon.png';
  additionalPlaceholderIcons = ['/assets/img/default-additional-icon1.png', '/assets/img/default-additional-icon2.png'];

  

  // MÉTODOS
  onFormSubmit(formType: string) {
    console.log(`${formType} enviado`);
  }
  
}
