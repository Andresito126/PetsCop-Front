import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserTypeGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userType = localStorage.getItem('userTypeInTheRegister');
    // da acceso sii si hay uairo de registro
    if (userType) {
      return true; 
    } else {
      //redirige si no existe algun usuario en el local para registro
      this.router.navigate(['/usuario']); 
      return false; 
    }
  }
}
