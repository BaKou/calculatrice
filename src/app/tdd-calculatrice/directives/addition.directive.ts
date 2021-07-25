import { Directive, HostListener } from '@angular/core';
import { AdditionService } from '../services/addition.service';

@Directive({
  selector: '[appAddition]'
})
export class AdditionDirective {
  constructor(private additionService: AdditionService) {}

  @HostListener('click', ['$event'])
  click(): void {
    this.additionService.add();
  }
}
