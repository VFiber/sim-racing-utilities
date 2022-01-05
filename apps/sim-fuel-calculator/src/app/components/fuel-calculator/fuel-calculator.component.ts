import { Component } from '@angular/core';
import { RaceDurationType, TimeDuration } from '@sim-utils/racing-model';

@Component({
  selector: 'sim-utils-fuel-calculator',
  template: `
    <h3>Race duration type</h3>
    <div class="grid grid-cols-1">
      <div>
        <mat-button-toggle-group class="w-full" [(ngModel)]="raceType" aria-label="Race Type">
          <mat-button-toggle class="w-1/2" [value]="RaceType.Time">Time based</mat-button-toggle>
          <mat-button-toggle class="w-1/2" [value]="RaceType.Lap">Lap based</mat-button-toggle>
        </mat-button-toggle-group>
        <div class="w-full mt-5 text-center" *ngIf="raceType === RaceType.Unknown">Please choose race type</div>
      </div>

      <sim-utils-slide-input *ngIf="raceType !== RaceType.Unknown" step="0.01" [sliderStep]="0.1" min="0" max="10" [(value)]="fuelPerLap" label="Fuel / Lap"></sim-utils-slide-input>

      <ng-container [ngSwitch]="raceType">
        <div *ngSwitchCase="RaceType.Lap">
          <sim-utils-slide-input step="1" min="0" max="100" [(value)]="lapCount" label="Laps"></sim-utils-slide-input>
        </div>
        <div *ngSwitchCase="RaceType.Time">
          <sim-utils-time-picker
            inputTitle="Lap time - "
            [min]="0" [max]="300" (durationChanged)="lapTimeChanged($event)"></sim-utils-time-picker>
          <sim-utils-time-picker
            inputTitle="Race time - "
            [min]="0" [max]="3600 * 24" [step]="60" (durationChanged)="raceTimeChanged($event)"></sim-utils-time-picker>
        </div>
      </ng-container>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg" *ngIf="raceType !== RaceType.Unknown">
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Recommended fuel amount (race + 1 formation lap)
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{((lapCount + 1) * fuelPerLap) | number }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Exact fuel amount required (race only)
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ng-container *ngIf="(lapCount * fuelPerLap) === 0">
                Please enter race distance / time and consumed fuel amount per lap
              </ng-container>

              <ng-container *ngIf="(lapCount * fuelPerLap) !== 0">
                {{ lapCount * fuelPerLap | number }}
              </ng-container>
            </dd>

          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Race distance & duration
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="font-bold">Distance</span>: {{lapCount | number}} laps
              <ng-container *ngIf="raceTimeInSeconds">
                <span class="font-bold">Duration:</span> {{ raceTimeInSeconds | secondsToInterval }}
              </ng-container>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  `,
  styleUrls: ['./fuel-calculator.component.scss']
})
export class FuelCalculatorComponent {
  RaceType = RaceDurationType;
  raceType: RaceDurationType = RaceDurationType.Time;

  lapCount = 0;
  fuelPerLap = 1;

  raceTimeInSeconds = 0;
  lapTimeInSeconds = 0;

  raceTimeChanged(timeDuration: TimeDuration) {
    this.raceTimeInSeconds = timeDuration.durationInSeconds;
    this.updateSumRaceLaps();
  }

  lapTimeChanged(timeDuration: TimeDuration) {
    this.lapTimeInSeconds = timeDuration.durationInSeconds;
    this.updateSumRaceLaps();
  }

  lapCountChanged(lapcount: number) {
    this.lapCount = lapcount;
  }

  updateSumRaceLaps() {
    if (!this.raceTimeInSeconds || !this.lapTimeInSeconds) {
      this.lapCount = 0;
      return;
    }

    this.lapCount = Math.ceil(this.raceTimeInSeconds / this.lapTimeInSeconds);
  }
}
