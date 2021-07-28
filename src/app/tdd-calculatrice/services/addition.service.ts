import { Injectable } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';
import { NumbersService } from './numbers.service';

@Injectable({
  providedIn: 'root'
})
export class AdditionService {
  constructor(private numbersService: NumbersService) {}

  add(): void {
    const numbers = this.numbersService.numbers.value;

    if (numbers.length < 2) {
      return undefined;
    }

    const result = numbers[numbers.length - 1] + numbers[numbers.length - 2];

    this.numbersService.addOperationNumber(result);
    this.numbersService.pop();
  }
}
