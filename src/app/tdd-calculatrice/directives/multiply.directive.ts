import { Directive, HostListener } from '@angular/core';
import { MultiplyService } from '../services/multiply.service';

@Directive({
  selector: '[appMultiply]'
})
export class MultiplyDirective {
  constructor(private multiplyService: MultiplyService) {}

  @HostListener('click', ['$event'])
  click(): void {
    this.multiplyService.multiply();
  }
}
