import { Component } from '@angular/core';

@Component({
  selector: 'app-card-schedule',
  templateUrl: './card-schedule.component.html',
  styleUrl: './card-schedule.component.css'
})
export class CardScheduleComponent {

 
  
    horarios = [
      { dia: 'Lunes', horarioEntrada: '11:00', horarioSalida:'19:00' },
      { dia: 'Martes', horarioEntrada: '11:00', horarioSalida:'19:00' },
      { dia: 'Miércoles', horarioEntrada: '11:00', horarioSalida:'19:00' },
      { dia: 'Jueves', horarioEntrada: '11:00', horarioSalida:'19:00' },
      { dia: 'Viernes', horarioEntrada: '11:00', horarioSalida:'19:00' },
      { dia: 'Sábado', horarioEntrada: '11:00', horarioSalida:'19:00' },
      { dia: 'Domingo', horarioEntrada: '11:00', horarioSalida:'19:00' }
    ];
  
  
  
  

}
