import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sim-utils-calculator-result-hud',
  template: `
    <div
      class="results text-center bg-gray-50 grid grid-cols-4">
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
          <ng-container *ngIf="lapCount !== 0">{{lapCount | number: '1.0-1'}}</ng-container>
          <ng-container *ngIf="lapCount === 0">?</ng-container>
        </span>
        <mat-label>Laps</mat-label>
      </div>
    </div>
  `,
  styleUrls: ['./calculator-result-hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorResultHudComponent {
  @Input() lapCount = 0;
  @Input() raceTimeInSeconds = 0;
  @Input() fuelPerLap = 0;
}
