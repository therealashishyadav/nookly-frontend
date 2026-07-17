import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let headers = req.headers || req.headers;

    // Attach Authorization header when token is available
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Add an X-Requested-With header to mitigate simple CSRF attacks
    // and help servers distinguish XHR requests
    headers = headers.set('X-Requested-With', 'XMLHttpRequest');

    const modifiedReq = req.clone({ headers });

    return next.handle(modifiedReq).pipe(
      catchError((err) => {
        if (err && err.status === 401) {
          // Clear session and redirect to login on unauthorized
          try {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
          } catch (_) {}
          // navigate away safely
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
