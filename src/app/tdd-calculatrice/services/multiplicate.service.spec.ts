import { TestBed } from '@angular/core/testing';

import { MultiplicateService } from './multiplicate.service';

describe('MultiplicateService', () => {
  let service: MultiplicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplicateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
