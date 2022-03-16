import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ExternalStorageActions from './external-storage.actions';
import { tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalculatorActions, SelectCalculator } from '../index';

@Injectable()
export class ExternalStorageEffects {
  init$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ExternalStorageActions.loadLastCalculatorState),
        tap(() => {
          const loadedString = localStorage.getItem("fuel-calculator-states");
          if (loadedString) {
            const state = JSON.parse(loadedString);
            //this.store.dispatch(ExternalStorageActions.loadExternalStorageSuccess({externalStorage: state}))
            this.store.dispatch(CalculatorActions.calculatorStateHydrated({state: state}))
          }
        })
      ),
    {dispatch: false}
  );

  store$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExternalStorageActions.saveCalculatorState),
      withLatestFrom(
        this.store.select(SelectCalculator.state)
      ),
      tap(([action, state]) => localStorage.setItem("fuel-calculator-states", JSON.stringify(state)))
    ), {dispatch: false}
  );

  constructor(private readonly actions$: Actions, private store: Store) {}
}
