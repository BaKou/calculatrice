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
    expect(service.temporaryNumber).toBe('');
    expect(service.numbers).toBe([]);
  });

  it('should return numbers ', () => {
    //GIVEN

    //WHEN
    const result = service.getNumbers();

    //THEN
    expect(result).toBe([]);
  });

  it('should return numbers ', () => {
    //GIVEN

    //WHEN
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toBe([]);
  });

  it('should return  temporaryNumber ', () => {
    //GIVEN

    //WHEN
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toBe('');
  });

  it('should add number to temporaryNumber ', () => {
    //GIVEN

    //WHEN
    service.addTemporaryNumber('2');
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toBe('2');
  });

  it('should delete one number to temporaryNumber ', () => {
    //GIVEN
    service.temporaryNumber = '12';

    //WHEN
    service.deleteOne();
    const result = service.getTemporaryNumber();

    //THEN
    expect(result).toBe('1');
  });
});
