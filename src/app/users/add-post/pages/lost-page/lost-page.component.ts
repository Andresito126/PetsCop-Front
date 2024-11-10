import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lost-page',
  templateUrl: './lost-page.component.html',
  styleUrl: './lost-page.component.css'
})
export class LostPageComponent {
  // variables
  currentStep: number = 1;

  fields = [
    //campos perro
    { label: 'Tipo de mascota', type: 'text', name: 'pet-type', placeholder: 'Selecciona a tu mascota', required: true },
    { label: 'Raza', type: 'text', name: 'pet-breed', placeholder: 'Selecciona la raza', required: true },
    { label: 'Nombre de la mascota', type: 'text', name: 'pet-name', placeholder: 'Ingresa el nombre de tu mascota', required: true },
    { label: 'Edad', type: 'number', name: 'pet-age', placeholder: 'Edad de tu mascota', required: true },
    //campos de direccion
    { label: 'Código postal', type: 'number', name: 'zip-code', placeholder: 'Ingresa tu código postal', required: true },
    { label: 'Estado', type: 'text', name: 'state', placeholder: 'Tu estado', required: true, disabled:true },
    { label: 'Municipio', type: 'text', name: 'municipality', placeholder: 'Tu municipio', required: true, disabled:true },
    { label: 'Colonia', type: 'text', name: 'neighborhood', placeholder: 'Tu colonia', required: true },
    { label: 'Fecha en que se perdió', type: 'date', name: 'date_lost', placeholder: 'Fecha de perdida ', required: true },
    { label: 'Descripción', type: 'text', name: 'description', placeholder: 'Pequeña descripción ', required: true },
    { label: 'Lugar de la ultima vez visto', type: 'text', name: 'last_seen', placeholder: 'Ultima vez que lo viste ', required: true },
    { label: 'Recompensa', type: 'number', name: 'reward', placeholder: '¿Recompensa? ', required: true },
    

  
  ];

  

  //metofos
  onSubmitLoss(event: any) {
    console.log('Formulario de perdida enviado', event);
    
  }

  onSubmitAdoption(event: any) {
    console.log('Formulario de adopción enviado', event);
    
  }

  async onLogin(data: any) {
    console.log("se envioperror");
  }



}
