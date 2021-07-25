import { Injectable } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private calculatriceService: CalculatriceService) {}

  log(): void {
    const numbers = this.calculatriceService.getNumbers();

    if (numbers.length < 2) {
      return;
    }

    const result = Math.log(numbers[numbers.length - 1]);

    this.calculatriceService.pop();
    this.calculatriceService.addOtherNumber(result);
  }
}
