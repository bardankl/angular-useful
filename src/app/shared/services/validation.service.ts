import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  public getValidationErrors(group: FormGroup, validationMessages: {}): {} {
    let formErrors = {};

    if (group) {
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);

        formErrors[key] = '';

        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          if (validationMessages) {
            const messages = validationMessages[key];

            for (const errorKey in abstractControl.errors) {
              if (errorKey && messages) {
                formErrors[key] += messages[errorKey];
              }
            }
          }
        }

        if (abstractControl instanceof FormGroup) {
          const groupError = this.getValidationErrors(
            abstractControl,
            validationMessages
          );
          formErrors = { ...formErrors, ...groupError };
        }
      });
    }

    return formErrors;
  }

  public matchConfirmItems(
    controlName: string,
    confirmControlName: string
  ): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];

      if (!control || !confirmControl) {
        return null;
      }
      if (confirmControl.errors && !confirmControl.errors.mismatch) {
        return null;
      }

      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ mismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
    };
  }
}
