import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ExternalStorageActions from './external-storage.actions';
import { ExternalStorageEntity } from './external-storage.models';

export const EXTERNAL_STORAGE_FEATURE_KEY = 'externalStorage';

export interface ExternalStorageState extends EntityState<ExternalStorageEntity> {
  selectedId?: string | number; // which ExternalStorage record has been selected
  loaded: boolean; // has the ExternalStorage list been loaded
  error?: string | null; // last known error (if any)
}

export interface ExternalStoragePartialState {
  readonly [EXTERNAL_STORAGE_FEATURE_KEY]: ExternalStorageState;
}

export const externalStorageAdapter: EntityAdapter<ExternalStorageEntity> =
  createEntityAdapter<ExternalStorageEntity>();

export const initialState: ExternalStorageState = externalStorageAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const externalStorageReducer = createReducer(
  initialState,
  on(ExternalStorageActions.loadLastCalculatorState, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ExternalStorageActions.loadExternalStorageSuccess,
    (state, { externalStorage }) =>
      externalStorageAdapter.setAll(externalStorage, { ...state, loaded: true })
  ),
  on(ExternalStorageActions.loadExternalStorageFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: ExternalStorageState | undefined, action: Action) {
  return externalStorageReducer(state, action);
}
