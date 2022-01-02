import { Component } from '@angular/core';
import { RaceDurationType } from '@sim-utils/racing-model';
import { intervalToDuration } from 'date-fns';

@Component({
  selector: 'sim-utils-fuel-calculator',
  template: `
    <div class="m-3">
      <h1>Fuel usage calculator<span class="text-xs">v 0.1 pre alpha by Fiber</span></h1>
      <h3>Race duration type</h3>
      <div class="grid grid-cols-1 gap-4">

        <mat-button-toggle-group class="col-start-1" [(ngModel)]="raceType" aria-label="Race Type">
          <mat-button-toggle class="w-1/2" [value]="RaceType.Time">Time based</mat-button-toggle>
          <mat-button-toggle class="w-1/2" [value]="RaceType.Lap">Lap based</mat-button-toggle>
        </mat-button-toggle-group>

        <div class="w-full mt-5 text-center" *ngIf="raceType === RaceType.Unknown">Please choose race type</div>

        <div class="bg-gray-50 p-4 md:grid md:grid-cols-12 md:gap-1 md:px-6" *ngIf="raceType !== RaceType.Unknown">
          <h3 class="md:col-span-12">Fuel per lap</h3>
          <mat-form-field class="w-full md:col-span-2">
            <mat-label>Fuel / lap</mat-label>
            <input type="number" step="0.01" class="w-full" matInput [(ngModel)]="fuelPerLap">
          </mat-form-field>
          <mat-slider class="w-full md:col-span-10" [(ngModel)]="fuelPerLap" thumbLabel
                      tickInterval="0.1" step="0.1" min="0" max="30" matTooltip="Slide to set fuel amount fast"
          ></mat-slider>
        </div>

        <ng-container [ngSwitch]="raceType">
          <div *ngSwitchCase="RaceType.Lap">
            <mat-form-field class="w-full">
              <mat-label>Laps</mat-label>
              <input type="number" step="1" min="0" [(ngModel)]="lapCount" matInput>
            </mat-form-field>
          </div>
          <div *ngSwitchCase="RaceType.Time">
            <h4>Lap time</h4>
            <div class="bg-gray-50 p-4 md:grid md:grid-cols-12 md:gap-1 md:px-6">
              <div class="grid grid-cols-3 gap-4 md:col-span-4">
                <mat-form-field>
                  <mat-label>Minutes</mat-label>
                  <input class="w-1/4" type="number" (change)="updateSecondsFromTime()" [(ngModel)]="lapTimeMinute"
                         matInput>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Seconds</mat-label>
                  <input class="w-1/4" type="number" (change)="updateSecondsFromTime()" [(ngModel)]="lapTimeSecond"
                         matInput>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Miliseconds</mat-label>
                  <input class="w-1/4" type="number" min="0" max="999" step="100" (change)="updateSecondsFromTime()"
                         [(ngModel)]="lapTimeMilisecond" matInput>
                </mat-form-field>
              </div>

              <mat-slider class="w-full md:col-span-8" [(ngModel)]="lapTimeInSeconds" thumbLabel tickInterval="1"
                          min="0" max="900"
                          (change)="updateTimeFromSeconds($event.value, true)"
                          [displayWith]="secondsToInterval"></mat-slider>
            </div>

            <h4 class="lead">Race time</h4>
            <div class="bg-gray-50 p-4 md:grid md:grid-cols-12 md:gap-1 md:px-6">
              <div class="grid grid-cols-4 gap-4 md:col-span-4">
                <mat-form-field>
                  <mat-label>Days</mat-label>
                  <input class="w-1/4" type="number" (change)="updateSecondsFromTime(false)" [(ngModel)]="raceTimeDay"
                         matInput>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Hour</mat-label>
                  <input class="w-1/4" type="number" (change)="updateSecondsFromTime(false)" [(ngModel)]="raceTimeHour"
                         matInput>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Minutes</mat-label>
                  <input class="w-1/4" type="number" (change)="updateSecondsFromTime(false)"
                         [(ngModel)]="raceTimeMinute"
                         matInput>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Seconds</mat-label>
                  <input class="w-1/4" type="number" (change)="updateSecondsFromTime(false)"
                         [(ngModel)]="raceTimeSecond"
                         matInput>
                </mat-form-field>
              </div>
              <mat-slider class="w-full md:col-span-8" [(ngModel)]="raceTimeInSeconds" thumbLabel step="15" min="0"
                          max="86400"
                          (change)="updateTimeFromSeconds($event.value, false)"
                          [displayWith]="secondsToInterval">
              </mat-slider>
            </div>
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
                <span class="font-bold">Distance</span>: {{lapCount | number}} laps <span
                class="font-bold">Duration:</span> {{ secondsToInterval(raceTimeInSeconds) }}
              </dd>
            </div>
          </dl>
        </div>
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

  raceTimeDay = 0;
  raceTimeHour = 0;
  raceTimeMinute = 0;
  raceTimeSecond = 0;

  raceTimeInSeconds = 0;

  lapTimeHour = 0;
  lapTimeMinute = 0;
  lapTimeSecond = 0;
  lapTimeMilisecond = 0;

  lapTimeInSeconds = 0;

  updateTimeFromSeconds(seconds: number | null, lapTime = true) {
    if (seconds === null) {
      return;
    }

    const duration = intervalToDuration({start: 0, end: seconds * 1000});

    if (lapTime) {
      this.lapTimeInSeconds = seconds;

      this.lapTimeHour = duration.hours || 0;
      this.lapTimeMinute = duration.minutes || 0;
      this.lapTimeSecond = duration.seconds || 0;
      this.lapTimeMilisecond = 0;
    } else {
      this.raceTimeInSeconds = seconds;

      this.raceTimeDay = duration.days || 0;
      this.raceTimeHour = duration.hours || 0;
      this.raceTimeMinute = duration.minutes || 0;
      this.raceTimeSecond = duration.seconds || 0;
    }

    this.updateSumRaceLaps();
  }

  updateSecondsFromTime(lapTime = true) {
    if (lapTime) {
      this.lapTimeInSeconds = this.lapTimeHour * 3600 + this.lapTimeMinute * 60 + this.lapTimeSecond + this.lapTimeMilisecond / 1000;
    } else {
      this.raceTimeInSeconds = this.raceTimeDay * 24 * 3600 + this.raceTimeHour * 3600 + this.raceTimeMinute * 60 + this.raceTimeSecond;
    }

    this.updateSumRaceLaps();
  }

  updateSumRaceLaps() {
    if (!this.raceTimeInSeconds || !this.lapTimeInSeconds) {
      this.lapCount = 0;
      return;
    }

    this.lapCount = Math.ceil(this.raceTimeInSeconds / this.lapTimeInSeconds);
  }

  secondsToInterval(seconds: number) {

    const duration = intervalToDuration({start: 0, end: seconds * 1000});

    if (duration.days) {
      return `${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
    }

    if (duration.hours) {
      return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
    }

    return `${duration.minutes}m ${duration.seconds}s`;
  }
}
