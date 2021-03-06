import { TestBed } from '@angular/core/testing';

import { DiviseService } from './divise.service';
import { CalculatriceService } from './calculatrice.service';

describe('DiviseService', () => {
  let service: DiviseService;

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
    service = TestBed.inject(DiviseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should divise two number', () => {
    //GIVEN
    jest
      .spyOn(calculatriceServiceMock, 'getNumbers')
      .mockReturnValueOnce([4, 2]);
    //WHEN
    service.divise();

    //THEN
    expect(calculatriceServiceMock.addOperationNumber).toBeCalledWith(0.5);
    expect(calculatriceServiceMock.pop).toBeCalled();
  });
});
