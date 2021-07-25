import { Directive, HostListener } from '@angular/core';
import { LogService } from '../services/log.service';

@Directive({
  selector: '[appLog]'
})
export class LogDirective {
  constructor(private logService: LogService) {}

  @HostListener('click', ['$event'])
  click(): void {
    this.logService.log();
  }
}
