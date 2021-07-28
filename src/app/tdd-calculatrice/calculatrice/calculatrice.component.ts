import { Component, OnInit } from '@angular/core';
import { CalculatriceService } from '../services/calculatrice.service';
import { NumbersService } from '../services/numbers.service';
import { TemporaryNumberService } from '../services/temporary-number.service';

@Component({
  selector: 'app-calculatrice-tdd',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceTddComponent implements OnInit {
  numbers: number[] = [];
  temporaryNumber = '';

  constructor(
    private numbersService: NumbersService,
    private temporaryNumberService: TemporaryNumberService
  ) {}

  ngOnInit(): void {
    this.numbersService.numbers.subscribe(numbers => (this.numbers = numbers));
    this.temporaryNumberService.temporaryNumber.subscribe(
      temporaryNumber => (this.temporaryNumber = temporaryNumber)
    );
  }

  addNumber(elmt: string): void {
    this.temporaryNumberService.addTemporaryNumber(elmt);
  }

  validate(): void {
    this.numbersService.addNumber();
  }

  deleteOne(): void {
    this.temporaryNumberService.deleteOne();
  }

  reset(): void {
    this.numbersService.clear();
    this.temporaryNumberService.clear();
  }

  comma(): void {
    this.temporaryNumberService.addComma();
  }
}
