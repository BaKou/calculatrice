import { TestBed } from '@angular/core/testing';

import { NumberBuilderService } from './number-builder.service';
import { filter, skip, take, takeLast } from 'rxjs/operators';

describe('NumberBuilderService', () => {
  let service: NumberBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberBuilderService);
    service.temporaryNumber$.subscribe((txt) => console.log('Receiving ', txt));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  ['7', '8,', '784,56'].forEach((digits) => {
    it(
      'should emit the current temporary number when adding the number ' +
        digits,
      (done) => {
        service.temporaryNumber$
          .pipe(skip(digits.length), take(1))
          .subscribe((txt) => {
            expect(txt).toBe(digits);
            done();
          });

        for (let c = 0; c < digits.length; c++) {
          const digit = digits.charAt(c);
          if (digit === ',') {
            service.addComma();
          } else {
            service.addDigit(digit);
          }
        }
      }
    );
  });

  fit('should only have one comma in number', async () => {
    service.addDigit('5');
    service.addComma();
    service.addDigit('5');
    service.addComma();

    service.temporaryNumber$.pipe(skip(4), take(1)).subscribe((txt) => {
      expect(txt).toBe('5,5');
    });

    expect(await service.temporaryNumber$.toPromise()).toBe('5,5');
  });

  it('should communicate number when is it finish', () => {
    service.addDigit('5');

    service.build();

    expect(service).toBeTruthy();
  });
});
