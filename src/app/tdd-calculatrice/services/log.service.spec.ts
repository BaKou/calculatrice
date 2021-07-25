import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { CalculatriceService } from './calculatrice.service';

describe('LogService', () => {
  let service: LogService;

  const calculatriceServiceMock = {
    pop: jest.fn(),
    addOtherNumber: jest.fn(),
    getNumbers: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CalculatriceService,
          useValue: calculatriceServiceMock
        }
      ]
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add log to the last number', () => {
    //GIVEN
    jest
      .spyOn(calculatriceServiceMock, 'getNumbers')
      .mockReturnValueOnce([4, 9]);
    //WHEN
    service.log();

    //THEN
    expect(calculatriceServiceMock.addOtherNumber).toBeCalledWith(
      2.1972245773362196
    );
    expect(calculatriceServiceMock.pop).toBeCalled();
  });
});
