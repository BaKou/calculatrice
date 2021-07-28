import { Injectable } from '@angular/core';
import { BehaviorSubject, VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporaryNumberService {
  public temporaryNumber = new BehaviorSubject<string>('');

  constructor() {}

  addTemporaryNumber(elmt: string): void {
    let currentTemporaryNumber = this.temporaryNumber.value;
    currentTemporaryNumber += elmt;
    this.temporaryNumber.next(currentTemporaryNumber);
  }

  clear(): void {
    this.temporaryNumber.next('');
  }

  deleteOne(): void {
    let currentTemporaryNumber = this.temporaryNumber.value;
    currentTemporaryNumber += currentTemporaryNumber.slice(
      0,
      currentTemporaryNumber.length - 1
    );
    this.temporaryNumber.next(currentTemporaryNumber);
  }

  addComma(): void {
    let currentTemporaryNumber = this.temporaryNumber.value;

    if (currentTemporaryNumber.match(/[.\/]/g) === null) {
      this.temporaryNumber.next(currentTemporaryNumber);
      currentTemporaryNumber += '.';
      this.temporaryNumber.next(currentTemporaryNumber);
    }
  }
}
