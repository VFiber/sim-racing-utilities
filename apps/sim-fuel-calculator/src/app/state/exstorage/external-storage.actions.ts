import { createAction, props } from '@ngrx/store';
import { ExternalStorageEntity } from './external-storage.models';

export const loadLastCalculatorState = createAction('[ExternalStorage/API] Load last saved state request');

export const loadExternalStorageSuccess = createAction(
  '[ExternalStorage/API] Load ExternalStorage Success',
  props<{ externalStorage: ExternalStorageEntity[] }>()
);

export const loadExternalStorageFailure = createAction(
  '[ExternalStorage/API] Load ExternalStorage Failure',
  props<{ error: unknown }>()
);

export const saveCalculatorState = createAction(
  '[ExternalStorage/API] State save request'
)
