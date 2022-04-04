import { createAction, props } from '@ngrx/store';
import { CarsEntity } from './cars.models';

export const init = createAction('[Cars Page] Init');

export const loadCarsSuccess = createAction(
  '[Cars/API] Load Cars Success',
  props<{ cars: CarsEntity[] }>()
);

export const loadCarsFailure = createAction(
  '[Cars/API] Load Cars Failure',
  props<{ error: any }>()
);

export const categoryFilterAdded = createAction(
  '[Cars Filter] Category filter added',
  props<{ filterCategory: string }>()
)

export const brandFilterAdded = createAction(
  '[Cars Filter] Brand filter added',
  props<{ filterBrand: string }>()
)

export const modelFilterAdded = createAction(
  '[Cars Filter] Model filter added',
  props<{ filterModel: string }>()
)

export const yearFilterAdded = createAction(
  '[Cars Filter] Year filter added',
  props<{ filterYear: number }>()
)

