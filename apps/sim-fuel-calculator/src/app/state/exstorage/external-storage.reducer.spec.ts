import { Action } from '@ngrx/store';

import * as ExternalStorageActions from './external-storage.actions';
import { ExternalStorageEntity } from './external-storage.models';
import { ExternalStorageState, initialState, reducer } from './external-storage.reducer';

describe('ExternalStorage Reducer', () => {
  const createExternalStorageEntity = (
    id: string,
    name = ''
  ): ExternalStorageEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid ExternalStorage actions', () => {
    it('loadExternalStorageSuccess should return the list of known ExternalStorage', () => {
      const externalStorage = [
        createExternalStorageEntity('PRODUCT-AAA'),
        createExternalStorageEntity('PRODUCT-zzz'),
      ];
      const action = ExternalStorageActions.loadExternalStorageSuccess({
        externalStorage,
      });

      const result: ExternalStorageState = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
