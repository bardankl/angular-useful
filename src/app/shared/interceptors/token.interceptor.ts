import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../common/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private ls: LocalStorageService) {}

  public intercept(
    request: HttpRequest<{}>,
    next: HttpHandler
  ): Observable<HttpEvent<{}>> {
    if (request.url.includes('api.kvk.nl')) {
      return next.handle(request);
    }

    const token: string = this.ls.getItem('token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return next.handle(request);
  }
}
