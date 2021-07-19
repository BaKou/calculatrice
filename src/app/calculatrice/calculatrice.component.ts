import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

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

  calcul(): void {}

  addNumber(elmt: string): void {
    this.temporaryNumber += elmt;
    console.log(this.temporaryNumber);
  }

  validate(): void {
    this.numbers.push(parseFloat(this.temporaryNumber));
    this.temporaryNumber = '';
  }
}
