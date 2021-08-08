import { Injectable } from '@angular/core';
import { CardType } from '../types/card.type';
import { CardsService } from './cards.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _playerScore = new BehaviorSubject<number>(0);
  playerScore$ = this._playerScore.asObservable();
  private _bankScore = new BehaviorSubject<number>(0);
  bankScore$ = this._bankScore.asObservable();
  temporaryScore = 0;
  private _playerRank = new BehaviorSubject<string>('');
  _playerRank$ = this._playerRank.asObservable();

  constructor(private cardsService: CardsService) { }


  getRank(): void {
    this.playerScore$.subscribe(score => {
      if (score < 10) {
        this._playerRank.next("POULAIN");
      } else if (score > 10 && score < 17) {
        this._playerRank.next("ETRE HUMAIN");
      } else if (score > 16 && score < 21) {
        this._playerRank.next("JEDI");
      } else if (score === 21) {
        this._playerRank.next("MASTER");
      }
    })
  }


  getScore(player: string): void {

    if (player === "bank") {
      this.cardsService.getBankCards().subscribe(cards => {
        this.calculateScore(cards, this._bankScore);
      })
    } else {
      this.cardsService.getPlayerCards().subscribe(cards => {
        this.calculateScore(cards, this._playerScore);
      });
    }
  }

  calculateScore(cards: CardType[], player: BehaviorSubject<number>): void {
    this.temporaryScore = 0;
    cards.forEach(card => {
      if (parseFloat(card.value) != NaN) {
        this.temporaryScore += parseFloat(card.value);
      } else {
        this.temporaryScore += 10
      }
    });
    player.next(this.temporaryScore);
  }
}
