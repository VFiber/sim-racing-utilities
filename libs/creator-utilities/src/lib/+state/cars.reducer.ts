import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CarsActions from './cars.actions';
import { CarsEntity } from './cars.models';

export const CARS_FEATURE_KEY = 'cars';

export interface State extends EntityState<CarsEntity> {
  selectedId?: string; // which Cars record has been selected
  loaded: boolean; // has the Cars list been loaded
  error?: string | null; // last known error (if any)
  filterCategory: string;
  filterBrand: string;
  filterModel: string;
  filterYear: number | null;
}

export interface CarsPartialState {
  readonly [CARS_FEATURE_KEY]: State;
}

export const carsAdapter: EntityAdapter<CarsEntity> =
  createEntityAdapter<CarsEntity>();

export const initialState: State = carsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  filterCategory: '',
  filterBrand: '',
  filterModel: '',
  filterYear: null
});

const carsReducer = createReducer(
  initialState,
  on(CarsActions.init, (state) => ({...state, loaded: false})),
  on(CarsActions.loadCarsSuccess, (state, {cars}) =>
    carsAdapter.setAll(cars, {...state, loaded: true})
  ),
  on(CarsActions.categoryFilterAdded, (state, {filterCategory}) => ({...state, filterCategory})),
  on(CarsActions.brandFilterAdded, (state, {filterBrand}) => ({...state, filterBrand})),
  on(CarsActions.modelFilterAdded, (state, {filterModel}) => ({...state, filterModel})),
  on(CarsActions.yearFilterAdded, (state, {filterYear}) => ({...state, filterYear}))
);

export function reducer(state: State | undefined, action: Action) {
  return carsReducer(state, action);
}
