import { TestBed } from '@angular/core/testing';

import { TemporaryNumberService } from './temporary-number.service';

describe('TemporaryNumberService', () => {
  let service: TemporaryNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporaryNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
