import { TestBed } from '@angular/core/testing';

import { DiviseService } from './divise.service';

describe('DiviseService', () => {
  let service: DiviseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiviseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
