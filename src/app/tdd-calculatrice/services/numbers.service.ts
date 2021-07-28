import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemporaryNumberService } from './temporary-number.service';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  public numbers = new BehaviorSubject<number[]>([]);

  constructor(private temporaryNumberService: TemporaryNumberService) {}

  addOperationNumber(elmt: number): void {
    const curentNumbers = this.numbers.value;
    const numberIndex = curentNumbers.length - 2;
    curentNumbers[numberIndex] = elmt;
    this.numbers.next(curentNumbers);
  }

  pop(): void {
    const curentNumbers = this.numbers.value;
    curentNumbers.pop();
    this.numbers.next(curentNumbers);
  }

  addOtherNumber(otherNumber: number): void {
    const curentNumbers = this.numbers.value;
    curentNumbers.push(otherNumber);
    this.numbers.next(curentNumbers);
  }

  addNumber(): void {
    const curentNumbers = this.numbers.value;
    this.temporaryNumberService.temporaryNumber.subscribe(temporaryNumber => {
      curentNumbers.push(parseFloat(temporaryNumber));
      this.numbers.next(curentNumbers);
    });
    this.temporaryNumberService.clear();
  }

  clear(): void {
    this.numbers.next([]);
  }
}
