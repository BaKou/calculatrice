import { Injectable } from '@angular/core';
import { CardType } from '../types/card.type';
import { CardsService } from './cards.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private _playerScore = new BehaviorSubject<number>(0);
  playerScore$ = this._playerScore.asObservable();
  private _bankScore = new BehaviorSubject<number>(0);
  bankScore$ = this._bankScore.asObservable();
  private _playerRank = new BehaviorSubject<string>('');
  playerRank$ = this._playerRank.asObservable();
  temporaryScore = 0;

  constructor(private cardsService: CardsService) {}

  public getPlayerScore(): Observable<number> {
    return this.playerScore$;
  }

  public getPlayerRank(): Observable<string> {
    return this.playerRank$;
  }

  public getBankScore(): Observable<number> {
    return this.bankScore$;
  }

  public getScore(player: string): void {
    if (player === 'bank') {
      this.cardsService.getBankCards().subscribe(
        (cards) => {
          this.calculateScore(cards, this._bankScore, false);
        },
        (err) => of(0)
      );
    } else {
      this.cardsService.getPlayerCards().subscribe(
        (cards) => {
          this.calculateScore(cards, this._playerScore, true);
        },
        (err) => of(0)
      );
    }
  }

  private calculateScore(
    cards: CardType[],
    player: BehaviorSubject<number>,
    calculateRank: boolean
  ): void {
    this.temporaryScore = 0;
    cards.forEach((card) => {
      if (card.value !== 'ACE') {
        if (Number.isInteger(parseInt(card.value, 10))) {
          this.temporaryScore += parseFloat(card.value);
        } else {
          this.temporaryScore += 10;
        }
      }
    });
    this.addAce(cards);

    if (calculateRank === true) {
      this.getRank(this.temporaryScore);
    }

    player.next(this.temporaryScore);
  }

  private addAce(cards: CardType[]): void {
    const aceCards = cards.filter((card) => card.value === 'ACE');

    if (aceCards.length > 0) {
      if (this.temporaryScore + 11 > 21) {
        this.temporaryScore += 1;
      } else {
        this.temporaryScore += 11;
      }
    }
  }

  private getRank(score: number): void {
    if (score <= 10) {
      this._playerRank.next('POULAIN');
    } else if (score > 10 && score < 17) {
      this._playerRank.next('ETRE HUMAIN');
    } else if (score > 16 && score < 21) {
      this._playerRank.next('JEDI');
    } else if (score === 21) {
      this._playerRank.next('MASTER');
    } else if (score > 21) {
      this._playerRank.next('PERDU');
    }
  }

  public findWinner(): string {
    const bankScore = this._bankScore.value;
    const playerScore = this._playerScore.value;

    if (
      (playerScore > bankScore && playerScore < 22) ||
      (bankScore > 21 && playerScore <= 21)
    ) {
      return 'Vous avez GAGNE';
    } else if (playerScore === bankScore) {
      return 'EGALITE';
    } else {
      return 'Vous avez PERDU';
    }
  }
}
