import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicRaceData, RaceDurationType, TimeDuration } from '@sim-utils/racing-model';
import { Store } from '@ngrx/store';
import { FastInputButton } from '@sim-utils/ui';
import { Observable } from 'rxjs';
import { FuelCalculatorService } from '../../services/fuel-calculator.service';

@Component({
  selector: 'sim-utils-fuel-calculator',
  template: `
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
      <div class="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:gap-4 items-center">

        <sim-utils-calculator-result-hud
          class="shadow-md border dark:border-gray-900 lg:shadow-none landscape:shadow-none sticky landscape:relative md:rounded-xl
          md:col-span-2 lg:col-span-7 lg:relative top-0 z-10"
          [fuelPerLap]="(fuelPerLap$ | ngrxPush) ?? 0"
          [lapCount]="(lapCount$ | ngrxPush) ?? 0"
          [raceTimeInSeconds]="(raceTimeInSeconds$ | ngrxPush) ?? 0"
        ></sim-utils-calculator-result-hud>

        <div class="text-center mt-5 md:mt-0 lg:col-span-5 p-5" [class.md:col-span-2]="raceTypeIsUnknown$ | ngrxPush">
          <mat-label class="block">Race duration type</mat-label>
          <mat-button-toggle-group class="w-3/5 max-w-xs" (change)="raceTypeChanged($event.value)"
                                   [value]="raceType$ | ngrxPush"
                                   aria-label="Race Type">
            <mat-button-toggle class="w-1/2" [value]="RaceType.Time">Time based</mat-button-toggle>
            <mat-button-toggle class="w-1/2" [value]="RaceType.Lap">Lap based</mat-button-toggle>
          </mat-button-toggle-group>
          <div class="choose-racetype w-full mt-5 text-center" *ngIf="raceTypeIsUnknown$ | ngrxPush">Please choose race
            type
          </div>
        </div>

        <sim-utils-slide-input class="lg:col-span-6"
                               *ngIf="!(raceTypeIsUnknown$ | ngrxPush)"
                               label="Fuel / Lap"
                               step="0.01" min="0" max="10" (valueChange)="fuelPerLapChanged($event)"
                               [value]="fuelPerLap$ | ngrxPush"
        ></sim-utils-slide-input>

        <sim-utils-slide-input class="md:col-span-2 lg:col-span-6"
                               *ngIf="(raceType$ | ngrxPush) === RaceType.Lap"
                               label="Laps"
                               step="1" min="0" max="100"
                               (valueChange)="lapCountChanged($event)"
                               [value]="lapCount$ | ngrxPush"
        ></sim-utils-slide-input>

        <sim-utils-time-picker class="md:col-span-2"
                               [ngClass]="(raceType$ | ngrxPush) === RaceType.Lap ? 'lg:col-span-12' : 'lg:col-span-6'"
                               *ngIf="!(raceTypeIsUnknown$ | ngrxPush)"
                               inputTitle="Lap time - "
                               [min]="0" [max]="300"
                               [durationInSeconds]="(lapTimeInSeconds$ | ngrxPush) ?? 0"
                               (durationChanged)="lapTimeChanged($event)"
        ></sim-utils-time-picker>

        <ng-container [ngSwitch]="raceType$ | ngrxPush">
          <sim-utils-time-picker class="md:col-span-2 lg:col-span-12"
                                 *ngSwitchCase="RaceType.Time"
                                 inputTitle="Race time - "
                                 [min]="0" [max]="3600 * 24" [step]="60"
                                 (durationChanged)="raceTimeChanged($event)"
                                 [durationInSeconds]="(raceTimeInSeconds$ | ngrxPush) ?? 0"
                                 [fastButtons]="raceTimeFastButtons"
          ></sim-utils-time-picker>
        </ng-container>
      </div>

      <div class="text-center mt-5 md:mt-0 lg:col-span-5 p-5" [class.md:col-span-2]="raceTypeIsUnknown$ | ngrxPush">
        <mat-button-toggle-group class="w-3/5 max-w-xs" aria-label="Race Type">
          <mat-button-toggle class="w-1/2" [disabled]="(canSaveFuelConsumption$ | ngrxPush) === false" (click)="save()">Save
          </mat-button-toggle>
          <mat-button-toggle class="w-1/2" (click)="load()">Load
          </mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <div
        class="border dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:col-span-4 bg-white dark:bg-gray-900 overflow-hidden sm:rounded-lg"
        *ngIf="!(raceTypeIsUnknown$ | ngrxPush)">
        <div>
          <dl>
            <div class="bg-gray-50 dark:bg-gray-800 grid grid-cols-2 gap-4 p-6">
              <dt class="text-sm text-center font-medium">
                &#8721; Recommended fuel amount (race + 1 formation lap)
              </dt>
              <dd class="text-xl text-center">
                <ng-container *ngIf="(canCalculateFuelConsumption$ | ngrxPush) else unknown">
                  {{recommendedFuelConsumption$ | ngrxPush | number: '1.3-3' }}
                </ng-container>
              </dd>
            </div>
            <div class="bg-white dark:bg-gray-900 grid grid-cols-2 gap-4 p-6">
              <dt class="text-sm font-medium">
                &#x222b; Exact fuel amount required (race only)
              </dt>
              <dd class="text-xl text-center">
                <ng-container *ngIf="(canCalculateFuelConsumption$ | ngrxPush) else unknown">
                  {{ exactFuelConsumption$ | ngrxPush | number: '1.3-3' }}
                </ng-container>
              </dd>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 grid grid-cols-2 gap-4 p-6" *ngIf="(raceTimeInSeconds$ | ngrxPush)">
              <dt class="text-sm text-center font-medium">
                Race time (race + 1 formation lap)
              </dt>
              <dd class="text-xl text-center">
                <ng-container *ngIf="(raceTimeInSeconds$ | ngrxPush) else unknown">
                  {{ (raceTimeInSeconds$ | ngrxPush) ?? 0 | secondsToInterval }}
                </ng-container>
              </dd>
            </div>
          </dl>
          <ng-template #unknown>?</ng-template>
        </div>
        <article class="mt-8 md:mt-0 p-5 prose lg:prose-xl bg-gray-50 dark:bg-gray-900">
          <h2>Formula</h2>
          <p>
      <span class="underline cursor-pointer"
            matTooltip="At the end of the race you have to finish your lap.">Lap Count from Race Time</span> = <span
            class="font-mono">(Race Time / Lap Time)</span> rounded up to the next whole lap
          </p>
          <p>
      <span class="underline cursor-pointer"
            matTooltip="Most of the time you need a warm up lap / rolling start lap before the race, that is counted as + 1 extra lap.">Recommended fuel</span>
            =
            <span class="font-mono">(Lap Count + 1) * (Fuel/Lap)</span>
          </p>
          <p>
      <span class="underline cursor-pointer"
            matTooltip="If calculated from Race Time Lap count rounded up to the closest integer">Exact fuel</span> =
            <span class="font-mono">Lap Count * (Fuel/Lap)</span>
          </p>
        </article>
      </div>
    </div>
  `,
  styleUrls: ['./fuel-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuelCalculatorComponent {
  raceTimeFastButtons: FastInputButton[] = [
    {
      title: ' +10m',
      value: 60 * 10
    },
    {
      title: ' +20m',
      value: 60 * 20
    },
    {
      title: ' +1h',
      value: 3600
    },
    {
      title: ' +2h',
      value: 3600 * 2
    },
    {
      title: ' +24h',
      value: 3600 * 24
    }
  ];
  RaceType = RaceDurationType;

  raceType$ = this.calculatorService.raceType$;
  raceTypeIsUnknown$ = this.calculatorService.raceTypeIsUnknown$;

  fuelPerLap$: Observable<number> = this.calculatorService.fuelPerLap$;
  lapCount$: Observable<number> = this.calculatorService.lapCount$;

  exactFuelConsumption$: Observable<number> = this.calculatorService.exactFuelConsumption$;
  canCalculateFuelConsumption$: Observable<boolean> = this.calculatorService.canCalculateFuelConsumption$;
  canSaveFuelConsumption$: Observable<boolean> = this.calculatorService.canSaveFuelConsumption$;

  recommendedFuelConsumption$: Observable<number> = this.calculatorService.recommendedFuelConsumption$;

  lapTimeInSeconds$: Observable<number> = this.calculatorService.lapTimeInSeconds$;
  raceTimeInSeconds$: Observable<number> = this.calculatorService.raceTimeInSeconds$;

  constructor(private store: Store<BasicRaceData>, private calculatorService: FuelCalculatorService) {}

  raceTypeChanged(newRaceType: RaceDurationType) {
    this.calculatorService.raceTypeChanged(newRaceType);
  }

  fuelPerLapChanged(newValue: number) {
    this.calculatorService.fuelPerLapChanged(newValue);
  }

  raceTimeChanged(timeDuration: TimeDuration) {
    this.calculatorService.raceTimeChanged(timeDuration);
  }

  lapTimeChanged(timeDuration: TimeDuration) {
    this.calculatorService.lapTimeChanged(timeDuration);
  }

  lapCountChanged(lapcount: number) {
    this.calculatorService.lapCountChanged(lapcount);
  }

  load() {
    this.calculatorService.loadLastCalculation();
  }

  save() {
    this.calculatorService.saveCalculation();
  }
}
