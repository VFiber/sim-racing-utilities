import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCalculator from './calculator.reducer';
import { BasicRaceData } from '@sim-utils/racing-model';

export const state = createFeatureSelector<BasicRaceData>(
  fromCalculator.calculatorFeatureKey
);

export const raceType = createSelector(
  state,
  (state: BasicRaceData) => state.raceType
)

export const lapTime = createSelector(
  state,
  (state: BasicRaceData) => state.lapTime
)

export const fuelPerLap = createSelector(
  state,
  (state: BasicRaceData) => state.fuelPerLap
)

export const lapCount = createSelector(
  state,
  (state: BasicRaceData) => state.lapCount
)

export const raceTime = createSelector(
  state,
  (state: BasicRaceData) => state.raceTime
)

export const exactFuelConsumption = createSelector(
  state,
  (data) => data.lapCount * data.fuelPerLap
)

export const recommendedFuelConsumption = createSelector(
  state,
  (data) => (data.lapCount + 1) * data.fuelPerLap
)
