import * as CalculatorActions from './calculator.actions';
import * as ExternalStorageActions from './exstorage/external-storage.actions';

import * as SelectCalculator from './calculator.selectors';
export * as SelectExternalStorageState from './calculator.selectors';

// somehow this type of export helps IDE functions better
export {
  CalculatorActions,
  ExternalStorageActions,
  SelectCalculator
}
