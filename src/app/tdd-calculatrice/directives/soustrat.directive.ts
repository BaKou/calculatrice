import { Directive, HostListener } from '@angular/core';
import { SoustractService } from '../services/soustract.service';

@Directive({
  selector: '[appSoustrat]'
})
export class SoustratDirective {
  constructor(private soustractService: SoustractService) {}

  @HostListener('click', ['$event'])
  handleClick(): void {
    this.soustractService.soustract();
  }
}
