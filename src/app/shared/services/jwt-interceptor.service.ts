import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skipAuth = req.headers.get('skipAuth') === 'true';
  
    if (skipAuth) {
      const headers = req.headers.delete('skipAuth');
      const request = req.clone({ headers });
      return next.handle(request);
    }
  
    const token: string | null = localStorage.getItem('token');
  
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.log(err)
          this.router.navigate(['login']);
        }
        return throwError(err);
      })
    );
  }
  

}
