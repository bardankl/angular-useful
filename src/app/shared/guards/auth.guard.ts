import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

import { LocalStorageService } from '../common/local-storage.service';

import * as fromAuth from '../../../root-store/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public userId: string = null;

  constructor(
    private authStore: Store<fromAuth.AuthState.State>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.getItem('userId');
  }

  public canActivate(): Observable<boolean> {
    return this.authStore.pipe(
      select(fromAuth.AuthSelectors.selectAuthToken),
      map((authed) => {
        if (!authed) {
          this.authStore.dispatch(
            fromAuth.AuthActions.authRedirect({ url: this.router.url })
          );
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
