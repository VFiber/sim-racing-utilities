import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { BasicRaceData, RaceDurationType, TimeDuration } from '@sim-utils/racing-model';
import { CalculatorActions, ExternalStorageActions, SelectCalculator } from '../state';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelCalculatorService {
  readonly raceType$ = this.store.select(SelectCalculator.raceType);
  readonly raceTypeIsUnknown$ = this.store.select(createSelector(SelectCalculator.raceType, type => type === RaceDurationType.Unknown));

  readonly fuelPerLap$: Observable<number> = this.store.select(SelectCalculator.fuelPerLap);
  readonly lapCount$: Observable<number> = this.store.select(SelectCalculator.lapCount);

  readonly exactFuelConsumption$: Observable<number> = this.store.select(SelectCalculator.exactFuelConsumption);

  readonly canCalculateFuelConsumption$: Observable<boolean> =
    this.store.select(SelectCalculator.exactFuelConsumption)
      .pipe(
        map(consumption => consumption > 0)
      );

  readonly canLoadFuelConsumption$: Observable<boolean> = new Observable<boolean>();
  readonly canSaveFuelConsumption$: Observable<boolean> = this.canCalculateFuelConsumption$;

  readonly recommendedFuelConsumption$: Observable<number> = this.store.select(SelectCalculator.recommendedFuelConsumption);

  readonly lapTimeInSeconds$: Observable<number> = this.store.select(SelectCalculator.lapTime);
  readonly raceTimeInSeconds$: Observable<number> = this.store.select(SelectCalculator.raceTime);

  constructor(private store: Store<BasicRaceData>) { }

  raceTypeChanged(newRaceType: RaceDurationType) {
    this.store.dispatch(CalculatorActions.raceTypeChanged({raceType: newRaceType}))
  }

  fuelPerLapChanged(newValue: number) {
    this.store.dispatch(CalculatorActions.fuelPerLapChanged({fuelPerLap: newValue}))
  }

  raceTimeChanged(timeDuration: TimeDuration) {
    this.store.dispatch(CalculatorActions.raceTimeChanged({raceSeconds: timeDuration.durationInSeconds}))
  }

  lapTimeChanged(timeDuration: TimeDuration) {
    this.store.dispatch(CalculatorActions.lapTimeChanged({lapSeconds: timeDuration.durationInSeconds}))
  }

  lapCountChanged(lapcount: number) {
    this.store.dispatch(CalculatorActions.lapCountChanged({lapCount: lapcount}))
  }

  saveCalculation() {
    this.store.dispatch(ExternalStorageActions.saveCalculatorState());
  }

  loadLastCalculation() {
    this.store.dispatch(ExternalStorageActions.loadLastCalculatorState());
  }
}
