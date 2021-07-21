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

  it('should ad number to temporaryNumber', () => {
    //GIVEN

    //WHEN
    component.addNumber('1');
    component.addNumber('2');

    //THEN
    expect(component.temporaryNumber).toBe('12');
  });

  it('should save number in array', () => {
    //GIVEN
    component.addNumber('1');
    component.addNumber('2');
    //WHEN
    component.validate();

    //THEN
    expect(component.numbers.length).toBe(1);
    expect(component.numbers[0]).toBe(12);
  });

  it('should add comma to number', () => {
    //GIVEN
    component.addNumber('1');

    //WHEN
    component.comma();

    //THEN
    expect(component.temporaryNumber).toBe('1.');
  });

  it('should reset array and temporaryNumber', () => {
    //GIVEN
    component.addNumber('1');
    component.addNumber('2');
    component.validate();
    component.addNumber('3');

    //WHEN
    component.reset();

    //THEN
    expect(component.numbers.length).toBe(0);
    expect(component.temporaryNumber).toBe('');
  });

  it('should erase one number', () => {
    //GIVEN
    component.addNumber('1');
    component.addNumber('2');

    //WHEN
    component.deleteOne();

    //THEN
    expect(component.temporaryNumber).toBe('1');
  });

  describe('Operation', () => {
    it('should add two number', () => {
      //GIVEN
      component.addNumber('1');
      component.validate();
      component.addNumber('2');
      component.validate();

      //WHEN
      component.operation('+');

      //THEN
      expect(component.numbers[0]).toBe(3);
      expect(component.numbers.length).toBe(1);
    });

    it('should soustrate two number', () => {
      ///GIVEN
      component.addNumber('1');
      component.validate();
      component.addNumber('2');
      component.validate();

      //WHEN
      component.operation('-');

      //THEN
      expect(component.numbers[0]).toBe(1);
      expect(component.numbers.length).toBe(1);
    });

    it('should divise two number', () => {
      //GIVEN
      component.addNumber('1');
      component.validate();
      component.addNumber('2');
      component.validate();

      //WHEN
      component.operation('%');

      //THEN
      expect(component.numbers[0]).toBe(2);
      expect(component.numbers.length).toBe(1);
    });

    it('should multiply two number', () => {
      //GIVEN
      component.addNumber('1');
      component.validate();
      component.addNumber('2');
      component.validate();

      //WHEN
      component.operation('x');

      //THEN
      expect(component.numbers[0]).toBe(2);
      expect(component.numbers.length).toBe(1);
    });
  });
});
