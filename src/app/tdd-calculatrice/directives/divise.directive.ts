import { Directive, HostListener } from '@angular/core';
import { DiviseService } from '../services/divise.service';

@Directive({
  selector: '[appDivise]'
})
export class DiviseDirective {
  constructor(private diviseService: DiviseService) {}

  @HostListener('click', ['$event'])
  click(): void {
    this.diviseService.divise();
  }
}
