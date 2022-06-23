import { createFeatureSelector, createSelector } from '@ngrx/store';
import { externalStorageFeatureKey, ExternalStorageState } from './external-storage.reducer';
import { NamedCalculation } from '../../calculator-database/db';

export const externalStorageFeature = createFeatureSelector<ExternalStorageState>(externalStorageFeatureKey);

export const savedCalculations = createSelector(
  externalStorageFeature,
  (state): NamedCalculation[] => state && state?.calculations && Array.isArray(state.calculations) ? state.calculations : []
)
