import { Injectable } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';
import { NumbersService } from './numbers.service';

@Injectable({
  providedIn: 'root'
})
export class SoustractService {
  constructor(private numbersService: NumbersService) {}

  soustract(): void {
    const numbers = this.numbersService.numbers.value;

    if (numbers.length < 2) {
      return;
    }

    const result = numbers[numbers.length - 1] - numbers[numbers.length - 2];

    this.numbersService.addOperationNumber(result);
    this.numbersService.pop();
  }
}
