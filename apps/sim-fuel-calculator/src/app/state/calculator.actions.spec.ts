import * as fromCalculator from './calculator.actions';
import { RaceDurationType } from '@sim-utils/racing-model';

describe('Calculator Actions', () => {
  it('should return an action', () => {
    expect(fromCalculator.raceTypeChanged({raceType: RaceDurationType.Unknown}).type).toBe('[Calculator] Race duration type changed');
  });
});
