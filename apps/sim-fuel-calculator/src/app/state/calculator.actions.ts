import { createAction, props } from '@ngrx/store';
import { RaceDurationType } from '@sim-utils/racing-model';

export const calculatorReseted = createAction(
  '[Calculator] Reset'
)

export const raceTypeChanged = createAction(
  '[Calculator] Race duration type changed',
  props<{ raceType: RaceDurationType }>()
);

export const fuelPerLapChanged = createAction(
  '[Calculator] Fuel per lap value changed',
  props<{ fuelPerLap: number }>()
);

export const lapTimeChanged = createAction(
  '[Calculator] Lap time changed',
  props<{ lapSeconds: number }>()
);

export const lapCountChanged = createAction(
  '[Calculator] Lap count changed',
  props<{ lapCount: number }>()
);

export const raceTimeChanged = createAction(
  '[Calculator] Race time changed',
  props<{ raceSeconds: number }>()
);


