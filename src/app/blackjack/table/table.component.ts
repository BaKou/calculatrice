import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Observable, of } from 'rxjs';
import { CardType } from '../types/card.type';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  playerCards$: Observable<CardType[]> = of([]);
  bankCards$: Observable<CardType[]> = of([]);
  playerScore$: Observable<number> = of(0);
  bankScore$: Observable<number> = of(0);
  playerRank$: Observable<string> = of('');
  winner = '';

  constructor(
    private cardsService: CardsService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.playerCards$ = this.cardsService.getPlayerCards();
    this.bankCards$ = this.cardsService.getBankCards();
    this.playerScore$ = this.scoreService.getPlayerScore();
    this.bankScore$ = this.scoreService.getBankScore();
    this.playerRank$ = this.scoreService.getPlayerRank();

    this.scoreService.getScore('player');
    this.scoreService.getScore('bank');
    this.scoreService.getRank();
  }

  startGame(): void {
    this.cardsService.startGame();
  }

  draw(): void {
    this.cardsService.drawCard('player');
  }

  endGame(): void {
    this.winner = this.scoreService.findWinner();
  }
}
