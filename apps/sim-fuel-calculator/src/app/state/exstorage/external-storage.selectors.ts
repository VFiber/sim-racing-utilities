import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EXTERNAL_STORAGE_FEATURE_KEY,
  ExternalStorageState,
  externalStorageAdapter,
} from './external-storage.reducer';

// Lookup the 'ExternalStorage' feature state managed by NgRx
export const getExternalStorageState = createFeatureSelector<ExternalStorageState>(
  EXTERNAL_STORAGE_FEATURE_KEY
);

const { selectAll, selectEntities } = externalStorageAdapter.getSelectors();

export const getExternalStorageLoaded = createSelector(
  getExternalStorageState,
  (state: ExternalStorageState) => state.loaded
);

export const getExternalStorageError = createSelector(
  getExternalStorageState,
  (state: ExternalStorageState) => state.error
);

export const getAllExternalStorage = createSelector(
  getExternalStorageState,
  (state: ExternalStorageState) => selectAll(state)
);

export const getExternalStorageEntities = createSelector(
  getExternalStorageState,
  (state: ExternalStorageState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getExternalStorageState,
  (state: ExternalStorageState) => state.selectedId
);

export const getSelected = createSelector(
  getExternalStorageEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
