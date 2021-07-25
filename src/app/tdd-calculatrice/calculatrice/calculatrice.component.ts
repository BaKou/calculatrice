import { Component, OnInit } from '@angular/core';
import { CalculatriceService } from '../services/calculatrice.service';

@Component({
  selector: 'app-calculatrice-tdd',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceTddComponent implements OnInit {
  numbers: number[] = [];
  temporaryNumber = '';

  constructor(private calculatriceService: CalculatriceService) {}

  ngOnInit(): void {
    this.refreshNumbers();
  }

  refreshNumbers(): void {
    this.numbers = this.calculatriceService.getNumbers();
    this.temporaryNumber = this.calculatriceService.getTemporaryNumber();
  }

  addNumber(elmt: string): void {
    this.calculatriceService.addTemporaryNumber(elmt);
    this.refreshNumbers();
  }

  validate(): void {
    this.calculatriceService.addNumber();
    this.refreshNumbers();
  }

  deleteOne(): void {
    this.calculatriceService.deleteOne();
    this.refreshNumbers();
  }

  reset(): void {
    this.calculatriceService.clearNumbers();
  }

  comma(): void {
    this.calculatriceService.addComma();
  }
}
