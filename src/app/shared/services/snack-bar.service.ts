import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { SnackBarEntities } from '../../constants/snack-bar/snack-bar-entities';
import { SnackBarOperations } from '../../constants/snack-bar/snack-bar-operations';
import { SnackBarTypes } from '../../constants/snack-bar/snack-bar-operations-types';
import { SnackBarParams } from '../../models/view-models/snack-bar/snack-bar-params';
import { SnackDialog } from '../../constants/snack-bar/snack-dialog';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(
    type: SnackBarTypes,
    operation: SnackBarOperations,
    entity: SnackBarEntities,
    params?: SnackBarParams,
    text?: string
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        type,
        title: entity,
        text: text || SnackDialog[type][operation],
      },
    });
  }
}
