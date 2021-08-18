import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ScoreService } from '../services/score.service';
import { CardsService } from '../services/cards.service';
import { PlayerComponent } from '../player/player.component';
import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

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

  const cardsServiceMock = {
    getPlayerCards: jest.fn(),
    getBankCards: jest.fn(),
    initializeGame: jest.fn(),
    drawCard: jest.fn(),
  };

  const scoreServiceMock = {
    getPlayerScore: jest.fn(),
    getBankScore: jest.fn(),
    getRank: jest.fn(),
    getScore: jest.fn(),
    getPlayerRank: jest.fn(),
    findWinner: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, PlayerComponent],
      providers: [
        {
          provide: ScoreService,
          useValue: scoreServiceMock,
        },
        {
          provide: CardsService,
          useValue: cardsServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get player card on init ', () => {
    const spyCard = jest
      .spyOn(cardsServiceMock, 'getPlayerCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));

    component.ngOnInit();

    expect(spyCard).toBeCalled();
    component.playerCards$.subscribe((cards) => {
      expect(cards).toStrictEqual(mockPlayerCardsOne);
    });
  });

  it('should get bank card on init ', () => {
    const spyCard = jest
      .spyOn(cardsServiceMock, 'getBankCards')
      .mockReturnValueOnce(of(mockPlayerCardsOne));

    component.ngOnInit();

    expect(spyCard).toBeCalled();
    component.bankCards$.subscribe((cards) => {
      expect(cards).toStrictEqual(mockPlayerCardsOne);
    });
  });

  it('should get player score on init ', () => {
    const spyScore = jest
      .spyOn(scoreServiceMock, 'getPlayerScore')
      .mockReturnValueOnce(of(15));

    component.ngOnInit();

    expect(spyScore).toBeCalled();
    component.playerScore$.subscribe((score) => {
      expect(score).toEqual(15);
    });
  });

  it('should get bank score on init ', () => {
    const spyScore = jest
      .spyOn(scoreServiceMock, 'getBankScore')
      .mockReturnValueOnce(of(12));

    component.ngOnInit();

    expect(spyScore).toBeCalled();
    component.bankScore$.subscribe((score) => {
      expect(score).toEqual(12);
    });
  });

  it('should get player rank  on init ', async () => {
    const spyRank = jest
      .spyOn(scoreServiceMock, 'getPlayerRank')
      .mockReturnValueOnce(of('POULAIN'));

    component.ngOnInit();

    expect(spyRank).toBeCalled();

    component.playerRank$.subscribe((rank) => {
      expect(rank).toEqual('POULAIN');
    });
  });

  it('should update score on init ', () => {
    const spyPlayerScore = jest.spyOn(scoreServiceMock, 'getScore');
    const spyBankScore = jest.spyOn(scoreServiceMock, 'getScore');

    component.ngOnInit();

    expect(spyPlayerScore).toBeCalledWith('player');
    expect(spyBankScore).toBeCalledWith('bank');
  });

  it('should start game ', () => {
    const startSpy = jest.spyOn(cardsServiceMock, 'initializeGame');

    component.startGame();

    expect(startSpy).toBeCalled();
  });

  it('should draw a card for the player', () => {
    const drawSpy = jest.spyOn(cardsServiceMock, 'drawCard');

    component.draw();

    expect(drawSpy).toBeCalled();
  });

  it('should find the winner', () => {
    const winnerSpy = jest.spyOn(scoreServiceMock, 'findWinner');

    component.endGame();

    expect(winnerSpy).toBeCalled();
  });
});
