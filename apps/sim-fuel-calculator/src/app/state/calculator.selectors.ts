import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCalculator from './calculator.reducer';
import { NamedCalculation } from '../calculator-database/db';

export const state = createFeatureSelector<NamedCalculation>(
  fromCalculator.calculatorFeatureKey
);

export const raceType = createSelector(
  state,
  (state: NamedCalculation) => state.raceType
)

export const lapTime = createSelector(
  state,
  (state: NamedCalculation) => state.lapTime
)

export const fuelPerLap = createSelector(
  state,
  (state: NamedCalculation) => state.fuelPerLap
)

export const lapCount = createSelector(
  state,
  (state: NamedCalculation) => state.lapCount
)

export const raceTime = createSelector(
  state,
  (state: NamedCalculation) => state.raceTime
)

export const exactFuelConsumption = createSelector(
  state,
  (data) => data.lapCount * data.fuelPerLap
)

export const recommendedFuelConsumption = createSelector(
  state,
  (data) => (data.lapCount + 1) * data.fuelPerLap
)

export const isLoadedCalculation = createSelector(
  state,
  (data) => data.id !== -1
)
