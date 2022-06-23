import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ExternalStorageActions from './external-storage.actions';
import { debounceTime, from, map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalculatorActions, SelectCalculator } from '../index';
import { DexieCalculationDatabase } from '../../calculator-database/db';

@Injectable()
export class ExternalStorageEffects {
  private LAST_STATE = "fuel-calculator-states";
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExternalStorageActions.autoLoadLastCalculatorState),
      tap(() => {
        const loadedString = localStorage.getItem(this.LAST_STATE);
        if (loadedString) {
          const state = JSON.parse(loadedString);
          this.store.dispatch(CalculatorActions.calculatorStateHydrated({state: state}))
        }
      }),
      mergeMap(() => this.loadIndexedDb())
    )
  );

  store$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CalculatorActions.fuelPerLapChanged,
        CalculatorActions.lapCountChanged,
        CalculatorActions.raceTimeChanged,
        CalculatorActions.raceTypeChanged
      ),
      debounceTime(3000),
      withLatestFrom(
        this.store.select(SelectCalculator.state)
      ),
      tap(([action, state]) => localStorage.setItem(this.LAST_STATE, JSON.stringify({...state, id: -1}))),
      map(() => ExternalStorageActions.autoSavedCalculatorState())
    )
  );

  instantSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExternalStorageActions.autoSaveCalculatorState
      ),
      withLatestFrom(
        this.store.select(SelectCalculator.state)
      ),
      tap(([action, state]) => localStorage.setItem(this.LAST_STATE, JSON.stringify({...state, id: -1}))),
      map(() => ExternalStorageActions.autoSavedCalculatorState())
    )
  );

  saveNamedState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExternalStorageActions.saveCurrentCalculatorState
      ),
      withLatestFrom(
        this.store.select(SelectCalculator.state)
      ),
      mergeMap(([action, state]) =>
        action.asNew ?
          from(DexieCalculationDatabase.calculationList.add({
            fuelPerLap: state.fuelPerLap,
            lapTime: state.lapTime,
            raceTime: state.raceTime,
            lapCount: state.lapCount,
            raceType: state.raceType,
            name: action.name
          }))
            .pipe(
              map(() => ExternalStorageActions.loadExternalStorageData())
            )
          :
          from(DexieCalculationDatabase.calculationList.update(state.id ?? -1, {...state, name: action.name}))
            .pipe(
              map(() => ExternalStorageActions.loadExternalStorageData())
            )
      )
    )
  );

  removeCalculation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExternalStorageActions.deleteCalculatorState),
      mergeMap(action =>
        from(DexieCalculationDatabase.calculationList.delete(action.id ?? 0))
          .pipe(
            map(() => ExternalStorageActions.loadExternalStorageData())
          )
      )
    )
  )

  syncCalculatorStateToExStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExternalStorageActions.loadCalculatorState),
      map((action) => CalculatorActions.calculatorStateHydrated({state: action.namedCalculation}))
    )
  );

  syncStateToExStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExternalStorageActions.loadExternalStorageData),
      mergeMap(() => this.loadIndexedDb())
    )
  );

  constructor(private readonly actions$: Actions, private store: Store) {}

  private loadIndexedDb() {
    return from(DexieCalculationDatabase.calculationList.toArray())
      .pipe(
        map(calculations => ExternalStorageActions.loadExternalStorageSuccess({externalStorage: calculations})
        )
      )
  }
}
