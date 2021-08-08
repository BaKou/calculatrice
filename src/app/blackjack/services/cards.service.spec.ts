import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CardsService } from './cards.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('CardsService', () => {
  let service: CardsService;
  let httpController: HttpTestingController;
  const deckId = 'DECKID_' + (1000 * Math.random()).toFixed(0);
  const mockCardResponse = {
    success: true,
    cards: [
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
    ],
    deck_id: '3p40paa87x90',
    remaining: 50,
  };

  const mockCardResponseTwo = {
    success: true,
    cards: [
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
    ],
    deck_id: '3p40paa87x90',
    remaining: 47,
  };

  const mockDeckResponse = {
    success: true,
    deck_id: deckId,
    shuffled: true,
    remaining: 52,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CardsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset player and bank card when start a new game', (done) => {
    service.startGame();

    service.playerCards$.subscribe((playerCard) => {
      expect(playerCard).toEqual([]);
    });
    service.bankCards$.subscribe((bankCard) => {
      expect(bankCard).toEqual([]);
    });
    done();
  });

  it('should initialise the game and give player and bank card', (done) => {
    const deckSpy = jest.spyOn(service, 'getDeck');
    const cardSpy = jest.spyOn(service, 'getCard');

    service.startGame();
    httpController
      .expectOne(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      )
      .flush(mockDeckResponse);

    expect(deckSpy).toBeCalled();

    httpController.match(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?2`
    );

    expect(cardSpy).toBeCalledTimes(2);

    service.bankCards$.subscribe((cards) =>
      expect(cards).toStrictEqual(mockCardResponse.cards)
    );
    service.initialized.subscribe((ini) => expect(ini).toBe(true));
    done();
  });

  it('should get one card and update player card when player draw during the game', async () => {
    service.startGame();
    httpController
      .expectOne(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      )
      .flush(mockDeckResponse);
    const cardSpy = jest.spyOn(service, 'getCard');

    service.drawCard('player');

    expect(cardSpy).toBeCalled();
    httpController
      .expectOne(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?1`)
      .flush(mockCardResponseTwo);

    service.playerCards$.subscribe((bc) => {
      expect(bc).toEqual(mockCardResponse.cards);
    });
    service.bankCards$.subscribe((bc) => {
      expect(bc).toEqual([]);
    });
  });
});
