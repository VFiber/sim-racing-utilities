import { TestBed } from '@angular/core/testing';

import { FuelCalculatorService } from './fuel-calculator.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('FuelCalculatorService', () => {
  let service: FuelCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });
    service = TestBed.inject(FuelCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
