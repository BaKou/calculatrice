import {
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
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

  const mockPLayerCards = [
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
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
  ];

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

  it('should reset player and bank cards and provide two cards when a game is initialize', (done) => {
    service.initializeGame();
    httpController
      .expectOne(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      )
      .flush(mockDeckResponse);
    const request = httpController.match(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );

    request[0].flush(mockCardResponse);
    request[1].flush(mockCardResponse);

    service.playerCards$.subscribe((cards) => {
      expect(cards).toStrictEqual(mockCardResponse.cards);
    });

    service.bankCards$.subscribe((cards) => {
      expect(cards).toStrictEqual(mockCardResponse.cards);
      done();
    });
  });

  it('should reset player and bank cards when a game is reinitialized after playing', () => {
    service.initializeGame();

    service.playerCards$.subscribe((cards) => {
      expect(cards).toStrictEqual([]);
    });

    service.bankCards$.subscribe((cards) => {
      expect(cards).toStrictEqual([]);
    });
  });

  it('should get a new deck when game initialized', async () => {
    service.initializeGame();
    httpController.expectOne(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
  });

  it('should get one card and update player card when player draw during the game', fakeAsync(() => {
    service.initializeGame();
    httpController
      .expectOne(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      )
      .flush(mockDeckResponse);
    const request = httpController.match(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    request[0].flush(mockCardResponse);

    service.drawCard();
    const requestDraw = httpController.expectOne(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    requestDraw.flush(mockCardResponseTwo);

    service.playerCards$.subscribe((cards) => {
      expect(cards).toStrictEqual(mockPLayerCards);
    });

    tick(1000);
  }));
});
