import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CarsActions from './cars.actions';
import { CarsEffects } from './cars.effects';

describe('CarsEffects', () => {
  let actions: Observable<Action>;
  let effects: CarsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CarsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CarsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CarsActions.init() });

      const expected = hot('-a-|', {
        a: CarsActions.loadCarsSuccess({ cars: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
