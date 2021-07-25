import { Injectable } from '@angular/core';
import { throwStatement } from '@babel/types';

@Injectable({
  providedIn: 'root'
})
export class CalculatriceService {
  numbers: number[] = [];
  temporaryNumber = '';

  constructor() {}

  addNumber(): void {
    this.numbers.push(parseFloat(this.temporaryNumber));
    this.temporaryNumber = '';
  }

  getNumbers(): number[] {
    return this.numbers;
  }

  getTemporaryNumber(): string {
    return this.temporaryNumber;
  }

  addTemporaryNumber(elmt: string): void {
    this.temporaryNumber += elmt;
  }

  clearNumbers(): void {
    this.numbers = [];
    this.temporaryNumber = '';
  }

  deleteOne(): void {
    this.temporaryNumber = this.temporaryNumber.slice(
      0,
      this.temporaryNumber.length - 1
    );
  }

  addOperationNumber(elmt: number): void {
    const numberIndex = this.numbers.length - 2;
    this.numbers[numberIndex] = elmt;
  }

  pop(): void {
    this.numbers.pop();
  }

  addOtherNumber(otherNumber: number): void {
    this.numbers.push(otherNumber);
  }

  addComma(): void {
    this.temporaryNumber += '.';
  }
}
