import { Component } from '@angular/core';

@Component({
  selector: 'app-lost-page',
  templateUrl: './lost-page.component.html',
  styleUrl: './lost-page.component.css'
})
export class LostPageComponent {
  // variables
  currentStep: number = 1;
  


  //metofos
  onSubmitLoss(event: any) {
    console.log('Formulario de adopción enviado', event);
    
  }

  goToNextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
