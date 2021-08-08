import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberBuilderService {
  private _temporaryNumber$ = new BehaviorSubject<string>('');
  temporaryNumber$ = this._temporaryNumber$.asObservable();

  constructor() {}

  addDigit(digit: string): void {
    const actualNumber = this._temporaryNumber$.value;
    this._temporaryNumber$.next(actualNumber + digit);
  }

  addComma(): void {
    const actualNumber = this._temporaryNumber$.value;
    this._temporaryNumber$.next(actualNumber + ',');
  }

  build(): void {}
}
