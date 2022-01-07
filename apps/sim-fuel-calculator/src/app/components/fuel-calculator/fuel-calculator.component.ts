import { Component } from '@angular/core';
import { RaceDurationType, TimeDuration } from '@sim-utils/racing-model';
import { FastInputButton } from '../../../../../../libs/ui/src/lib/models';

@Component({
  selector: 'sim-utils-fuel-calculator',
  template: `
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
      <div class="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:gap-4 items-center">
        <div
          class="results
          shadow-md
          border
          lg:shadow-none
          landscape:shadow-none
          sticky
          landscape:relative
          md:rounded-xl
          md:col-span-2
          lg:col-span-7
          lg:relative
          top-0
          z-10
          text-center
          bg-gray-50
          grid grid-cols-4">
          <div>
        <span class="digits" *ngIf="(lapCount * fuelPerLap) !== 0">
          {{((lapCount + 1) * fuelPerLap) | number: '1.0-1' }}
        </span>
            <span class="digits" *ngIf="(lapCount * fuelPerLap) === 0">?</span>
            <mat-label>
              <span class="inline md:hidden">&#8721; Fuel</span>
              <span class="hidden md:inline">Recommended &nbsp;fuel</span><span
              class="hidden lg:inline">&nbsp;amount</span>
            </mat-label>
          </div>
          <div>
            <span class="digits"
                  *ngIf="(lapCount * fuelPerLap) !== 0">{{ lapCount * fuelPerLap | number: '1.0-1' }}</span>
            <span class="digits" *ngIf="(lapCount * fuelPerLap) === 0">?</span>
            <mat-label>
              <span class="inline md:hidden"> &#x222b; Fuel</span>
              <span class="hidden md:inline">Exact&nbsp;fuel</span><span class="hidden lg:inline">&nbsp;amount</span>
            </mat-label>
          </div>
          <div>
        <span class="digits time">
          <ng-container *ngIf="raceTimeInSeconds !== 0">{{ raceTimeInSeconds | secondsToInterval }}</ng-container>
          <ng-container *ngIf="raceTimeInSeconds === 0">?</ng-container>
        </span>
            <mat-label>Duration</mat-label>
          </div>
          <div>
        <span class="digits">
          <ng-container *ngIf="lapCount !== 0">{{lapCount}}</ng-container>
          <ng-container *ngIf="lapCount === 0">?</ng-container>
        </span>
            <mat-label>Laps</mat-label>
          </div>
        </div>

        <div class="text-center mt-5 md:mt-0 lg:col-span-5">
          <mat-label class="block">Race duration type</mat-label>
          <mat-button-toggle-group class="w-3/5 max-w-xs" [(ngModel)]="raceType" aria-label="Race Type">
            <mat-button-toggle class="w-1/2" [value]="RaceType.Time">Time based</mat-button-toggle>
            <mat-button-toggle class="w-1/2" [value]="RaceType.Lap">Lap based</mat-button-toggle>
          </mat-button-toggle-group>
          <div class="w-full mt-5 text-center" *ngIf="raceType === RaceType.Unknown">Please choose race type</div>
        </div>

        <sim-utils-slide-input class="lg:col-span-6"
                               *ngIf="raceType !== RaceType.Unknown"
                               label="Fuel / Lap"
                               step="0.01" min="0" max="10" [(value)]="fuelPerLap"
        ></sim-utils-slide-input>

        <ng-container [ngSwitch]="raceType">
          <sim-utils-slide-input class="md:col-span-2 lg:col-span-6"
                                 *ngSwitchCase="RaceType.Lap"
                                 label="Laps"
                                 step="1" min="0" max="100" [(value)]="lapCount"></sim-utils-slide-input>

          <sim-utils-time-picker class="md:col-span-2 lg:col-span-6"
                                 *ngSwitchCase="RaceType.Time"
                                 inputTitle="Lap time - "
                                 [min]="0" [max]="300" [seconds]="lapTimeInSeconds"
                                 (durationChanged)="lapTimeChanged($event)"></sim-utils-time-picker>

          <sim-utils-time-picker class="md:col-span-2 lg:col-span-12"
                                 *ngSwitchCase="RaceType.Time"
                                 inputTitle="Race time - "
                                 [min]="0" [max]="3600 * 24" [seconds]="raceTimeInSeconds" [step]="60"
                                 (durationChanged)="raceTimeChanged($event)"
                                 [fastButtons]="raceTimeFastButtons"
          ></sim-utils-time-picker>
        </ng-container>
      </div>

      <div
        class="border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:col-span-4 bg-white overflow-hidden sm:rounded-lg"
        *ngIf="raceType !== RaceType.Unknown">
        <div>
          <dl>
            <div class="bg-gray-50 grid grid-cols-2 gap-4 p-6">
              <dt class="text-sm text-center font-medium text-gray-500">
                &#8721; Recommended fuel amount (race + 1 formation lap)
              </dt>
              <dd class="text-gray-900 text-xl text-center">
                <ng-container *ngIf="(lapCount * fuelPerLap) === 0">?</ng-container>
                <ng-container
                  *ngIf="(lapCount * fuelPerLap) !== 0">{{((lapCount + 1) * fuelPerLap) | number: '1.3-3' }}
                </ng-container>
              </dd>
            </div>
            <div class="bg-white grid grid-cols-2 gap-4 p-6">
              <dt class="text-sm font-medium text-gray-500">
                &#x222b; Exact fuel amount required (race only)
              </dt>
              <dd class="text-gray-900 text-xl text-center">
                <span *ngIf="(lapCount * fuelPerLap) === 0">
                  ?
                </span>

                <ng-container *ngIf="(lapCount * fuelPerLap) !== 0">
                  {{ lapCount * fuelPerLap | number: '1.3-3' }}
                </ng-container>
              </dd>
            </div>
          </dl>
        </div>
        <article class="mt-8 md:mt-0 p-5 prose lg:prose-xl bg-gray-50">
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
  styleUrls: ['./fuel-calculator.component.scss']
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
  raceType: RaceDurationType = RaceDurationType.Time;

  lapCount = 0;
  fuelPerLap = 0;

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
