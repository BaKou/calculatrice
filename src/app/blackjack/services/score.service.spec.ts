import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';
import { CardsService } from './cards.service';
import { of } from 'rxjs';

describe('ScoreService', () => {
  let service: ScoreService;

  const mockPlayerCards = [
    {
      "image": "https://deckofcardsapi.com/static/img/KH.png",
      "value": "KING",
      "suit": "HEARTS",
      "code": "KH"
    },
    {
      "image": "https://deckofcardsapi.com/static/img/8C.png",
      "value": "8",
      "suit": "CLUBS",
      "code": "8C"
    }
  ];

  let cardsServiceMock = {
    getPlayerCards: jest.fn(),
    getBankCards: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: cardsServiceMock,
        }
      ]
    });
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate player rank ', () => {
    jest.spyOn(cardsServiceMock, 'getPlayerCards').mockReturnValueOnce(of(mockPlayerCards))
    service.getScore('player');

    service.getRank();

    service._playerRank$.subscribe(rank => {
      expect(rank).toBe("JEDI")
    })
  });

  it('should calculate a player score', () => {

    jest.spyOn(cardsServiceMock, 'getPlayerCards').mockReturnValueOnce(of(mockPlayerCards))
    const calculateSpy = jest.spyOn(service, 'calculateScore');
    service.getScore('player');

    expect(calculateSpy).toBeCalled()
    service.playerScore$.subscribe(score => {
      expect(score).toEqual(18)
    })
  });
});
