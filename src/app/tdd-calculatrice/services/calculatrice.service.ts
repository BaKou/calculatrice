import { Injectable } from '@angular/core';
import { throwStatement } from '@babel/types';

@Injectable({
  providedIn: 'root'
})
export class CalculatriceService {
  numbers: number[] = [];
  temporaryNumber = '';

  constructor() {}

  pop(): void {
    this.numbers.pop();
  }

  addComma(): void {
    this.temporaryNumber += '.';
  }
}
