import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show player card', () => {
    component.playerCards = [
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
    fixture.detectChanges();

    const elmtText = fixture.nativeElement.querySelector('.card');

    expect(elmtText).toBeTruthy();
  });

  it('should show player score', () => {
    component.score = 10;

    fixture.detectChanges();
    const elmtText = fixture.nativeElement.querySelector('#score');

    expect(elmtText).toBeTruthy();
  });

  it('should not show player score', () => {
    component.score = 0;

    fixture.detectChanges();
    const elmtText = fixture.nativeElement.querySelector('#score');

    expect(elmtText).toBeFalsy();
  });
});
