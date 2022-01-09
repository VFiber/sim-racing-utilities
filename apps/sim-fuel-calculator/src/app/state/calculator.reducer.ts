import { createReducer, on } from '@ngrx/store';
import * as CalculatorActions from './calculator.actions';
import { BasicRaceData, RaceDurationType } from '@sim-utils/racing-model';

export const calculatorFeatureKey = 'calculator';

export const initialState: BasicRaceData = {
  raceType: RaceDurationType.Unknown,
  fuelPerLap: 0,
  lapTime: 0,
  raceTime: 0,
  lapCount: 0
};

export const reducer = createReducer(
  initialState,
  on(CalculatorActions.raceTypeChanged, (s, {raceType}): BasicRaceData => (
      {
        ...s,
        raceType: raceType,
        raceTime: 0,
        lapCount: 0
      }
    )
  ),
  on(CalculatorActions.fuelPerLapChanged, (s, {fuelPerLap}) => (
    {
      ...s,
      fuelPerLap: fuelPerLap,
    }
  )),
  on(CalculatorActions.lapTimeChanged, (s, {lapSeconds}) =>
    (
      {
        ...s,
        lapTime: lapSeconds,
        raceTime: s.raceType === RaceDurationType.Lap ? s.lapCount * lapSeconds : s.raceTime,
        lapCount: s.raceType === RaceDurationType.Lap ? s.lapCount :
          (
            s.raceTime && lapSeconds ? s.raceTime / lapSeconds : 0
          )
      }
    )
  ),
  on(CalculatorActions.raceTimeChanged, (s, {raceSeconds}) =>
    (
      {
        ...s,
        raceTime: raceSeconds,
        lapCount: s.raceType === RaceDurationType.Lap ? s.lapCount :
          (
            raceSeconds && s.lapTime ? raceSeconds / s.lapTime : 0
          )
      }
    )
  ),
  on(CalculatorActions.lapCountChanged, (s, {lapCount}) =>
    (
      {
        ...s,
        lapCount: lapCount,
        raceTime: s.raceType === RaceDurationType.Lap ? lapCount * s.lapTime : s.raceTime,
      }
    )
  )
);
