import { Injectable } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';

@Injectable({
  providedIn: 'root'
})
export class MultiplyService {
  constructor(private calculatriceService: CalculatriceService) {}

  multiply(): void {
    const numbers = this.calculatriceService.getNumbers();

    if (numbers.length < 2) {
      return;
    }

    const result = numbers[numbers.length - 1] * numbers[numbers.length - 2];

    this.calculatriceService.addOperationNumber(result);
    this.calculatriceService.pop();
  }
}
