import { Injectable } from '@angular/core';
import { CardType } from '../types/card.type';
import { CardsService } from './cards.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _score = new BehaviorSubject<number>(0);
  score$ = this._score.asObservable();

  constructor(private cardsService: CardsService) { }


  getRank(): string {

    const userCards = this.cardsService.getUsercards();

    this.cardsService.playerCards$.subscribe(cards => {




    })

    return '';
  }


  getScore(player: string): void {

    if (player === "bank") {
      
    } else {

    }

    return
  }
}
