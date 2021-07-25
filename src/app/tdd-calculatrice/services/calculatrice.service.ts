import { Injectable } from '@angular/core';

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
}
