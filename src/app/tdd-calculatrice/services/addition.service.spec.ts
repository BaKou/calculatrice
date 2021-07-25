import { TestBed } from '@angular/core/testing';

import { AdditionService } from './addition.service';
import { CalculatriceService } from './calculatrice.service';

describe('AdditionService', () => {
  let service: AdditionService;

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
    service = TestBed.inject(AdditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two number', () => {
    //GIVEN
    jest
      .spyOn(calculatriceServiceMock, 'getNumbers')
      .mockReturnValueOnce([1, 2]);

    //WHEN
    service.add();

    //THEN
    expect(calculatriceServiceMock.addOperationNumber).toBeCalledWith(3);
    expect(calculatriceServiceMock.pop).toBeCalled();
  });
});
