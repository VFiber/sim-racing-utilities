import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import cars from './../database/cars.json';

import * as CarsActions from './cars.actions';
import { map, tap } from 'rxjs';
import { AutocompleteCar } from '@sim-utils/racing-model';

@Injectable()
export class CarsEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActions.init),
      map(
        () => CarsActions.loadCarsSuccess({cars: cars as AutocompleteCar[]})
      )
    )
  );

  constructor(private readonly actions$: Actions) {}
}
