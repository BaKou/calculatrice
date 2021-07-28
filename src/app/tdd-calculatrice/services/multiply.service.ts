import { Injectable } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';
import { NumbersService } from './numbers.service';

@Injectable({
  providedIn: 'root'
})
export class MultiplyService {
  constructor(private numbersService: NumbersService) {}

  multiply(): void {
    const numbers = this.numbersService.numbers.value;

    if (numbers.length < 2) {
      return;
    }

    const result = numbers[numbers.length - 1] * numbers[numbers.length - 2];

    this.numbersService.addOperationNumber(result);
    this.numbersService.pop();
  }
}
