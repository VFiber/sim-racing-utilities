import { createAction, props } from '@ngrx/store';
import { NamedCalculation } from '../../calculator-database/db';

export const autoLoadLastCalculatorState = createAction('[ExternalStorage/API] Load last saved state request');

export const loadExternalStorageSuccess = createAction(
  '[ExternalStorage/API] Load ExternalStorage Success',
  props<{ externalStorage: NamedCalculation[] }>()
);

export const autoSaveCalculatorState = createAction(
  '[ExternalStorage/API] Auto state save request'
)

export const autoSavedCalculatorState = createAction(
  '[ExternalStorage/API] State saved'
)

export const saveCurrentCalculatorState = createAction(
  '[ExternalStorage/API] Save calculation request',
  props<{ name: string, asNew: boolean }>()
)

export const savedCurrentCalculatorState = createAction(
  '[ExternalStorage/API] Calculation saved',
  props<{ name: string, id: number }>()
)

export const loadCalculatorState = createAction(
  '[ExternalStorage/API] Load calculation state',
  props<{ namedCalculation: NamedCalculation }>()
)

export const loadExternalStorageData = createAction(
  '[ExternalStorage/API] Stored calculations needs resync',
)

export const deleteCalculatorState = createAction(
  '[ExternalStorage/API] Delete calculation request',
  props<{ id: number }>()
)
