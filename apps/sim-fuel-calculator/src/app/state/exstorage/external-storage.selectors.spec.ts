import { ExternalStorageEntity } from './external-storage.models';
import {
  externalStorageAdapter,
  ExternalStoragePartialState,
  initialState,
} from './external-storage.reducer';
import * as ExternalStorageSelectors from './external-storage.selectors';

describe('ExternalStorage Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getExternalStorageId = (it: ExternalStorageEntity) => it.id;
  const createExternalStorageEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ExternalStorageEntity);

  let state: ExternalStoragePartialState;

  beforeEach(() => {
    state = {
      externalStorage: externalStorageAdapter.setAll(
        [
          createExternalStorageEntity('PRODUCT-AAA'),
          createExternalStorageEntity('PRODUCT-BBB'),
          createExternalStorageEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('ExternalStorage Selectors', () => {
    it('getAllExternalStorage() should return the list of ExternalStorage', () => {
      const results = ExternalStorageSelectors.getAllExternalStorage(state);
      const selId = getExternalStorageId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ExternalStorageSelectors.getSelected(
        state
      ) as ExternalStorageEntity;
      const selId = getExternalStorageId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getExternalStorageLoaded() should return the current "loaded" status', () => {
      const result = ExternalStorageSelectors.getExternalStorageLoaded(state);

      expect(result).toBe(true);
    });

    it('getExternalStorageError() should return the current "error" state', () => {
      const result = ExternalStorageSelectors.getExternalStorageError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
