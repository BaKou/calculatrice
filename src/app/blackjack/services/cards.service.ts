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
  providedIn: 'root',
})
export class CardsService {
  private _deckId = '';
  private _playerCards = new BehaviorSubject<CardType[]>([]);
  private _bankCards = new BehaviorSubject<CardType[]>([]);
  public readonly bankCards$ = this._bankCards.asObservable();
  public readonly playerCards$: Observable<CardType[]> =
    this._playerCards.asObservable();

  constructor(private http: HttpClient) {}

  public getPlayerCards(): Observable<CardType[]> {
    return this.playerCards$;
  }

  public getBankCards(): Observable<CardType[]> {
    return this.bankCards$;
  }

  private getDeck(): Observable<DeckResponseType> {
    return this.http.get<DeckResponseType>(
      `${environment.apiUrl}/deck/new/shuffle/?deck_count=1`
    );
  }

  private getCard(numberOfCards: number): Observable<CardResponseType> {
    return this.http.get<CardResponseType>(
      `${environment.apiUrl}/deck/${this._deckId}/draw/?count=${numberOfCards}`
    );
  }

  public initializeGame(): void {
    this._playerCards.next([]);
    this._bankCards.next([]);

    this.getDeck().subscribe((deckResponse) => {
      this._deckId = deckResponse.deck_id;

      this.getCard(2).subscribe((cardResponse) =>
        this._playerCards.next(cardResponse.cards)
      );

      this.getCard(2).subscribe((cardResponse) =>
        this._bankCards.next(cardResponse.cards)
      );
    });
  }

  public drawCard(): void {
    this.getCard(1).subscribe((cardResponse) => {
      const userDeck = this._playerCards.value;
      userDeck.push(cardResponse.cards[0]);
      this._playerCards.next(userDeck);
    });
  }
}
