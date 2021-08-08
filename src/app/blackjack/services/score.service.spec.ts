import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';
import { CardsService } from './cards.service';

describe('ScoreService', () => {
  let service: ScoreService;

  let cardsServiceMock = {
    getUserCards: jest.fn(),
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

  it('should calculate user rannk ', () => {

    const rank = service.getRank();

    expect(rank).toBe("jedi")
  });

  it('should calculate a player score', () => {

    service.getScore('player');

  });
});
