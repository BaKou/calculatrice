import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdditionService {
  constructor() {}

  add(numberOne: number, numberTwo: number): number {
    return numberOne + numberTwo;
  }
}
