import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ToastService } from 'ng-mdb-pro/pro/alerts/toast/toast.service';

@Injectable()
  export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastService: ToastService) {}

    public intercept(
      request: HttpRequest<{}>,
      next: HttpHandler
    ): Observable<HttpEvent<{}>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.url.includes('billing')) {
            this.toastService.error('Something went wrong');
          }
          if (error.status === 503) {
            return of(null);
          }
          if (error.status === 401) {
            // if we need this or 503  we can use it, or custom error types from be
            return of(null);
          }
          if (error.status === 403) {
            this.toastService.error('Something went wrong, access forbidden');
            // this.router.navigate(['/']);
          }
        })
      );
    }
  }
