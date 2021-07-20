import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatriceComponent } from './calculatrice.component';
import { ButtonComponent } from '../shared/button/button.component';

describe('CalculatriceComponent', () => {
  let component: CalculatriceComponent;
  let fixture: ComponentFixture<CalculatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatriceComponent, ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add number', () => {
    //GIVEN

    //WHEN
    component.addNumber('1');

    //THEN
    expect(component.temporaryNumber).toBe('1');
  });

  it('should create', () => {
    //GIVEN

    //WHEN
    component.addNumber('1');
    component.addNumber('2');

    //THEN
    expect(component.temporaryNumber).toBe('12');
  });

  it('should save number in array', () => {
    expect(component).toBeTruthy();
  });
});
