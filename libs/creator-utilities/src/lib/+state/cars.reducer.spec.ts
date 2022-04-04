import { Action } from '@ngrx/store';

import * as CarsActions from './cars.actions';
import { CarsEntity } from './cars.models';
import { State, initialState, reducer } from './cars.reducer';

describe('Cars Reducer', () => {
  const createCarsEntity = (id: string, name = ''): CarsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Cars actions', () => {
    it('loadCarsSuccess should return the list of known Cars', () => {
      const cars = [
        createCarsEntity('PRODUCT-AAA'),
        createCarsEntity('PRODUCT-zzz'),
      ];
      const action = CarsActions.loadCarsSuccess({ cars });

      const result: State = reducer(initialState, action);

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
