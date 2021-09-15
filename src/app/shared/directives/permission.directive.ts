import {
    Directive,
    TemplateRef,
    ViewContainerRef,
    Input,
    OnInit,
    OnDestroy,
  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromUser from '../../root-store/user';

@Directive({
    selector: '[appHasPermission]',
  })
  export class HasPermissionDirective implements OnInit, OnDestroy {
    private permission: string;
    private subscription$: Subscription;

    constructor(
      private templateRef: TemplateRef<{}>,
      private viewContainer: ViewContainerRef,
      private store: Store<fromUser.UserState.State>
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
      if (this.subscription$) {
        this.subscription$.unsubscribe();
      }
    }

    @Input()
    public set datriHasPermission(val: string) {
      this.permission = val;
      this.updateView();
    }

    private updateView(): void {
      this.subscription$ = this.store
        .pipe(select(fromUser.UserSelector.selectUserPermissions))
        .subscribe((perm) => {
          if (perm && perm.includes(this.permission)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        });
    }
  }
