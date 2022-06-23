import { createReducer, on } from '@ngrx/store';
import { ExternalStorageActions } from '../index';
import { NamedCalculation } from '../../calculator-database/db';

export const externalStorageFeatureKey = 'exStorage';

export interface ExternalStorageState {
  calculations: NamedCalculation[];
}

export const initialState: ExternalStorageState = {
  calculations: []
};

export const reducer = createReducer(
  initialState,
  on(ExternalStorageActions.loadExternalStorageSuccess, (s, {externalStorage}) => ({...s, calculations: externalStorage}))
);
