import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CalculatorEffects } from './calculator.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './calculator.reducer';

describe('CalculatorEffects', () => {
  let actions$: Observable<unknown>;
  let effects: CalculatorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorEffects,
        provideMockStore({initialState}),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CalculatorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});
