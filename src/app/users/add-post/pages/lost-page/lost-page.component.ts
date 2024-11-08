import { Component } from '@angular/core';

@Component({
  selector: 'app-lost-page',
  templateUrl: './lost-page.component.html',
  styleUrl: './lost-page.component.css'
})
export class LostPageComponent {


  //metofos
  onSubmitLoss(event: any) {
    console.log('Formulario de adopción enviado', event);
    
  }

}
