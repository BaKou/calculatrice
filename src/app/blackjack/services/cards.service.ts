import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DeckResponseType } from '../types/deck-response.type';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CardResponseType } from '../types/card-response.type';
import { switchMap, tap, map } from 'rxjs/operators';
import { CardType } from '../types/card.type';
import { ScoreService } from './score.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private _deckId = '';
  private _playerCards = new BehaviorSubject<CardType[]>([]);
  playerCards$ = this._playerCards.asObservable();
  private _bankCards = new BehaviorSubject<CardType[]>([]);
  bankCards$ = this._bankCards.asObservable();
  private _initialized = false;

  constructor(private http: HttpClient) { }

  getPlayerCards(): Observable<CardType[]> {
    return this.playerCards$;
  }

  getBankCards(): Observable<CardType[]> {
    return this.bankCards$;
  }

  get initialized(): Observable<boolean> {
    return of(this._initialized);
  }

  getDeck(): Observable<DeckResponseType> {
    return this.http.get<DeckResponseType>(`${environment.apiUrl}/deck/new/shuffle/?deck_count=1`);
  }

  getCard(numberOfCards: number): Observable<CardResponseType> {
    return this.http.get<CardResponseType>(`${environment.apiUrl}/deck/${this._deckId}/draw/?count=${numberOfCards}`);
  }

  drawCard(player: string): void {
    this.getCard(1).subscribe(cardResponse => {
      if (player === 'bank') {
        const bankDeck = this._bankCards.value;
        bankDeck.push(cardResponse.cards[0]);
        this._bankCards.next(bankDeck);
      } else {
        const userDeck = this._playerCards.value;
        userDeck.push(cardResponse.cards[0]);
        this._playerCards.next(userDeck);
      }
    });
  }

  startGame(): void {

    this._playerCards.next([]);
    this._bankCards.next([]);

    this.getDeck().pipe(
      map(newDeck => this._deckId = newDeck.deck_id),
      tap(() => this.getCard(2).subscribe(cardsResponse => this._bankCards.next(cardsResponse.cards))),
      tap(() => this.getCard(2).subscribe(cardsResponse => {
        this._playerCards.next(cardsResponse.cards);
      })),
    ).subscribe(ini => this._initialized = true);
  }
}
