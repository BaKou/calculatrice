import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.cardsService.startGame();
  }
}
