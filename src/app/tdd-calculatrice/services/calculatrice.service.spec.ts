import { TestBed } from '@angular/core/testing';

import { CalculatriceService } from './calculatrice.service';

describe('CalculatriceService', () => {
  let service: CalculatriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear numbers', () => {
    //GIVEN

    //WHEN
    service.clearNumbers();

    //THEN
    expect(service.temporaryNumber).toStrictEqual('');
    expect(service.numbers).toStrictEqual([]);
  });

  it('should return numbers ', () => {
    //GIVEN

    //WHEN
    const result = service.getNumbers();

    //THEN
    expect(result).toStrictEqual([]);
  });

  it('should return numbers ', () => {
    //GIVEN

    //WHEN
    const result = service.getNumbers();

    //THEN
    expect(result).toStrictEqual([]);
  });

  it('should return  temporaryNumber ', () => {
    //GIVEN

    //WHEN
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toStrictEqual('');
  });

  it('should add number to temporaryNumber ', () => {
    //GIVEN

    //WHEN
    service.addTemporaryNumber('2');
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toStrictEqual('2');
  });

  it('should delete one number to temporaryNumber ', () => {
    //GIVEN
    service.temporaryNumber = '12';

    //WHEN
    service.deleteOne();
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toStrictEqual('1');
  });

  it('should add one number to numbers at the before last position', () => {
    //GIVEN
    service.numbers = [1, 2, 3];

    //WHEN
    service.addOperationNumber(12);
    const result = service.getNumbers();

    //THEN
    expect(result).toStrictEqual([1, 12, 3]);
  });

  it('should remove the last number of numbers ', () => {
    //GIVEN
    service.numbers = [1, 2];

    //WHEN
    service.pop();
    const result = service.getNumbers();

    //THEN
    expect(result).toStrictEqual([1]);
  });

  it('should add number to numbers ', () => {
    //GIVEN
    service.numbers = [];

    //WHEN
    service.addOtherNumber(12);
    const result = service.getNumbers();

    //THEN
    expect(result).toStrictEqual([12]);
  });

  it('should add comma to temporaryNumber ', () => {
    //GIVEN
    service.temporaryNumber = '12';

    //WHEN
    service.addComma();
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toStrictEqual('12.');
  });
});
