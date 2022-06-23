import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ExternalStorageActions from './external-storage.actions';
import { ExternalStorageEffects } from './external-storage.effects';

describe('ExternalStorageEffects', () => {
  let actions: Observable<Action>;
  let effects: ExternalStorageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ExternalStorageEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ExternalStorageEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ExternalStorageActions.autoLoadLastCalculatorState() });

      const expected = hot('-?-|', {
        a: ExternalStorageActions.loadExternalStorageSuccess({
          externalStorage: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
