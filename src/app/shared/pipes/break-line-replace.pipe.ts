import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakLineReplace',
})
export class BreakLineReplacePipe implements PipeTransform {
  public transform(value: string): string {
    if (!value) {
      return null;
    }

    return value.replace(/\r?\n/g, '<br />');
  }
}
