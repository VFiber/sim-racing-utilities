import { initialState, reducer } from './calculator.reducer';
import { CalculatorActions } from './index';
import { BasicRaceData, RaceDurationType } from '@sim-utils/racing-model';

function createMockState(state: Partial<BasicRaceData>) {
  return {
    ...initialState,
    ...state
  }
}

describe('Calculator Reducer', () => {
  it('An unknown action should return the previous state', () => {
    const action = {type: 'asdf'};

    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  describe('On RaceDurationType changes', () => {
    it('From scratch nothing happens and the type is set', () => {
      expect(
        reducer(
          initialState,
          CalculatorActions.raceTypeChanged({raceType: RaceDurationType.Time})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time})
      );

      expect(
        reducer(
          initialState,
          CalculatorActions.raceTypeChanged({raceType: RaceDurationType.Lap})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Lap})
      );

      expect(
        reducer(
          initialState,
          CalculatorActions.raceTypeChanged({raceType: RaceDurationType.Unknown})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Unknown})
      );
    });

    it('When race type is set, a next change clears the calculated and given values', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 100, raceTime: 100}),
          CalculatorActions.raceTypeChanged({raceType: RaceDurationType.Time})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 0, raceTime: 0})
      );

      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 132, raceTime: 132}),
          CalculatorActions.raceTypeChanged({raceType: RaceDurationType.Time})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 0, raceTime: 0})
      );
    });
  });

  describe("On Lap time changes", () => {
    it('When race type is Lap, lap time updates race time correctly', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 100, raceTime: 100}),
          CalculatorActions.lapTimeChanged({lapSeconds: 3})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Lap, lapTime: 3, lapCount: 100, raceTime: 300})
      );
    });

    it('When race type is Lap, no lap count set then no racetime should be set', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 0, raceTime: 1}),
          CalculatorActions.lapTimeChanged({lapSeconds: 3})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Lap, lapTime: 3, lapCount: 0, raceTime: 0})
      );
    });

    it('When race type is Time, updates lap count correctly', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 0, raceTime: 300}),
          CalculatorActions.lapTimeChanged({lapSeconds: 3})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapTime: 3, lapCount: 100, raceTime: 300})
      );
    });

    it('When race type is Time, and no race time set clears lap count', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 1, raceTime: 0}),
          CalculatorActions.lapTimeChanged({lapSeconds: 3})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapTime: 3, lapCount: 0, raceTime: 0})
      );
    });
  });

  describe('On fuel / lap changes', () => {
    it('Sets fuel per lap correctly', () => {
      expect(
        reducer(initialState, CalculatorActions.fuelPerLapChanged({fuelPerLap: 1}))
      ).toStrictEqual(
        createMockState({fuelPerLap: 1})
      );
    });

    it('Changing fuelPerLap does not affect anything else', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 1, raceTime: 0}),
          CalculatorActions.fuelPerLapChanged({fuelPerLap: 5})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 1, raceTime: 0, fuelPerLap: 5})
      );
    });
  });

  describe('On lap count changes', () => {
    it('Sets lap count correctly without changing anything else', () => {
      // this should not happen, but if it does, we don't want anything to change
      expect(
        reducer(createMockState({raceType: RaceDurationType.Time}),
          CalculatorActions.lapCountChanged({lapCount: 5})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapCount: 5})
      );
    });

    it('Recalculates race time if raceType is Lap and Laptime is set', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 1, raceTime: 1, fuelPerLap: 5}),
          CalculatorActions.lapCountChanged({lapCount: 5})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 5, raceTime: 5, fuelPerLap: 5})
      );
    });
  });

  describe('On race time changes', () => {
    it('If type is Time sets racetime correctly and counts lapCount', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 1}),
          CalculatorActions.raceTimeChanged({raceSeconds: 5})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Time, lapTime: 1, lapCount: 5, raceTime: 5})
      );
    });

    it('If type is Lap nothing happens just sets the raceTime', () => {
      expect(
        reducer(
          createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 1}),
          CalculatorActions.raceTimeChanged({raceSeconds: 5})
        )
      ).toStrictEqual(
        createMockState({raceType: RaceDurationType.Lap, lapTime: 1, lapCount: 1, raceTime: 5})
      );
    });

  });

});
