import { TestBed } from '@angular/core/testing';

import { MultiplyService } from './multiply.service';
import { CalculatriceService } from './calculatrice.service';

describe('MultiplyService', () => {
  let service: MultiplyService;

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
    service = TestBed.inject(MultiplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiply two number', () => {
    //GIVEN
    jest
      .spyOn(calculatriceServiceMock, 'getNumbers')
      .mockReturnValueOnce([4, 2]);
    //WHEN
    service.multiply();

    //THEN
    expect(calculatriceServiceMock.addOperationNumber).toBeCalledWith(8);
    expect(calculatriceServiceMock.pop).toBeCalled();
  });
});
