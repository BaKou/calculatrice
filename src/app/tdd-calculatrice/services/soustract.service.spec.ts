import { TestBed } from '@angular/core/testing';

import { SoustractService } from './soustract.service';
import { CalculatriceService } from './calculatrice.service';

describe('SoustractService', () => {
  let service: SoustractService;

  const calculatriceServiceMock = {
    pop: jest.fn(),
    addOperationNumber: jest.fn(),
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
    service = TestBed.inject(SoustractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should divise two number', () => {
    //GIVEN
    jest
      .spyOn(calculatriceServiceMock, 'getNumbers')
      .mockReturnValueOnce([2, 4]);
    //WHEN
    service.soustract();

    //THEN
    expect(calculatriceServiceMock.addOperationNumber).toBeCalledWith(2);
    expect(calculatriceServiceMock.pop).toBeCalled();
  });
});
