import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringService {
  constructor() {}

  public numberToString(num: number): string {
    return num.toFixed(2).toString().replace('.', ',');
  }

  public stringToNumber(str: string): number {
    return parseFloat(str.replace(',', '.'));
  }
}
