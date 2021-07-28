import { Injectable } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';
import { NumbersService } from './numbers.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private numbersService: NumbersService) {}

  log(): void {
    const numbers = this.numbersService.numbers.value;

    if (numbers.length < 2) {
      return;
    }

    const result = Math.log(numbers[numbers.length - 1]);

    this.numbersService.pop();
    this.numbersService.addOtherNumber(result);
  }
}
