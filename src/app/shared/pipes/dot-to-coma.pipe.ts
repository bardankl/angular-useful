import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotToComa',
})
export class DotToComaPipe implements PipeTransform {
  public transform(value: number): string {
    if (!value) {
      return null;
    }

    return value.toFixed(2).toString().replace('.', ',');
  }
}
