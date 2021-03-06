import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceComponent implements OnInit {
  numbers: number[] = [];
  temporaryNumber = '';

  constructor() {}

  ngOnInit(): void {}

  addNumber(elmt: string): void {
    this.temporaryNumber += elmt;
  }

  validate(): void {
    this.numbers.push(parseFloat(this.temporaryNumber));
    this.temporaryNumber = '';
  }

  operation(symbol: string): void {
    if (this.numbers.length < 2) {
      return;
    }

    switch (symbol) {
      case '+':
        this.numbers[this.numbers.length - 2] =
          this.numbers[this.numbers.length - 1] +
          this.numbers[this.numbers.length - 2];
        this.numbers.pop();
        break;

      case '-':
        this.numbers[this.numbers.length - 2] =
          this.numbers[this.numbers.length - 1] -
          this.numbers[this.numbers.length - 2];
        this.numbers.pop();
        break;

      case '%':
        this.numbers[this.numbers.length - 2] =
          this.numbers[this.numbers.length - 1] /
          this.numbers[this.numbers.length - 2];
        this.numbers.pop();
        break;

      case 'log':
        this.numbers[this.numbers.length - 1] = Math.log(
          this.numbers[this.numbers.length - 1]
        );
        break;

      case 'x':
        this.numbers[this.numbers.length - 2] =
          this.numbers[this.numbers.length - 1] *
          this.numbers[this.numbers.length - 2];
        this.numbers.pop();
        break;
    }
  }

  reset(): void {
    this.numbers = [];
    this.temporaryNumber = '';
  }

  comma(): void {
    this.temporaryNumber += '.';
  }

  deleteOne(): void {
    this.temporaryNumber = this.temporaryNumber.slice(
      0,
      this.temporaryNumber.length - 1
    );
  }
}
