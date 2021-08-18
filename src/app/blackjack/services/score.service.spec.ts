import {
  TestBed,
  fakeAsync,
  tick,
  flush,
  flushMicrotasks,
} from '@angular/core/testing';

import { ScoreService } from './score.service';
import { CardsService } from './cards.service';
import { of } from 'rxjs';

describe('ScoreService', () => {
  let service: ScoreService;

  const mockPlayerCardsOne = [
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: '2',
      suit: 'HEARTS',
      code: '2H',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: '8',
      suit: 'CLUBS',
      code: '8C',
    },
  ];

  const mockPlayerCardsTwo = [
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: '8',
      suit: 'HEARTS',
      code: '8H',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: '8',
      suit: 'CLUBS',
      code: '8C',
    },
  ];
  const mockPlayerCardsThree = [
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
  ];
  const mockPlayerCardsFour = [
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: 'KING',
      suit: 'CLUBS',
      code: 'KC',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: '1',
      suit: 'CLUBS',
      code: '1C',
    },
  ];
  const mockPlayerCardsFive = [
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: 'ACE',
      suit: 'HEARTS',
      code: 'AH',
    },
  ];

  const mockPlayerCardsSix = [
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: 'ACE',
      suit: 'HEARTS',
      code: 'AH',
    },
  ];

  const mockPlayerCardsSeven = [
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/KH.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
    {
      image: 'https://deckofcardsapi.com/static/img/8C.png',
      value: 'KING',
      suit: 'HEARTS',
      code: 'KH',
    },
  ];
  const cardsServiceMock = {
    getPlayerCards: jest.fn(),
    getBankCards: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: cardsServiceMock,
        },
      ],
    });
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate a player score and update his rank, the rank should be poulain', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toBe(10);
      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('POULAIN');
        done();
      });
    });
  });

  it('should calculate a player score and update his rank, the rank should be etre humain', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsTwo));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(16);
      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('ETRE HUMAIN');
        done();
      });
    });
  });

  it('should calculate a player score and update his rank, the rank should be jedi', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsThree));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(18);
      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('JEDI');
        done();
      });
    });
  });

  it('should calculate a player score and update his rank, the rank should be master', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsFour));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(21);

      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('MASTER');
        done();
      });
    });
  });

  it('should calculate a player score with an ace and update his rank, the rank should be master', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsFive));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(21);

      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('MASTER');
        done();
      });
    });
  });

  it('should calculate a player score with an ace and update his rank, the rank should be master', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsSix));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(21);

      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('MASTER');
        done();
      });
    });
  });

  it('should calculate a player score and update his rank, the rank should be perdu', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsSeven));

    service.getScore('player');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(30);
      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('PERDU');
        done();
      });
    });
  });

  it('should calculate a bank score and not a player rank', (done) => {
    jest
      .spyOn(cardsServiceMock, 'getBankCards')
      .mockReturnValueOnce(of(mockPlayerCardsSeven));

    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsSeven));

    service.getScore('bank');

    service.playerScore$.subscribe((score) => {
      expect(score).toEqual(0);
      service.playerRank$.subscribe((rank) => {
        expect(rank).toEqual('');
      });
    });

    service.bankScore$.subscribe((score) => {
      expect(score).toEqual(30);
      done();
    });
  });

  it('should find the winner at the end of the game player win', fakeAsync(() => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsTwo));
    jest
      .spyOn(cardsServiceMock, 'getBankCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));
    service.getScore('bank');
    service.getScore('player');

    tick(1000);
    const result = service.findWinner();

    expect(result).toBe('Vous avez GAGNE');
  }));

  xit('should find the winner at the end of the game player lose', () => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));
    jest
      .spyOn(cardsServiceMock, 'getBankCards')
      .mockReturnValueOnce(of(mockPlayerCardsFour));
    service.getScore('player');
    service.getScore('bank');

    const result = service.findWinner();

    expect(result).toBe('Vous avez PERDU');
  });

  xit('should find the winner at the end of the game tie', () => {
    jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));
    jest
      .spyOn(cardsServiceMock, 'getBankCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));
    service.getScore('bank');
    service.getScore('player');

    const result = service.findWinner();

    expect(result).toBe('EGALITE');
  });
});
