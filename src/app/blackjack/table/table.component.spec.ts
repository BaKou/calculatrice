import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ScoreService } from '../services/score.service';
import { CardsService } from '../services/cards.service';
import { PlayerComponent } from '../player/player.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const cardsServiceMock = {
    getPlayerCards: jest.fn(),
    getBankCards: jest.fn(),
    startGame: jest.fn(),
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

  it('should start game ', () => {
    const startSpy = jest.spyOn(cardsServiceMock, 'startGame');

    component.startGame();

    expect(startSpy).toBeCalled();
  });

  it('should draw a card for the player', () => {
    const drawSpy = jest.spyOn(cardsServiceMock, 'drawCard');

    component.draw();

    expect(drawSpy).toBeCalledWith('player');
  });

  it('should find the winner', () => {
    const winnerSpy = jest.spyOn(scoreServiceMock, 'findWinner');

    component.endGame();

    expect(winnerSpy).toBeCalled();
  });
});
