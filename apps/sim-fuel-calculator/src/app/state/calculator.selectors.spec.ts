import * as fromCalculator from './calculator.reducer';
import { state } from './calculator.selectors';

describe('Calculator Selectors', () => {
  it('should select the feature state', () => {
    const result = state({
      [fromCalculator.calculatorFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
