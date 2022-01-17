import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { TimeDuration } from '@sim-utils/racing-model';
import { SecondsToIntervalPipe } from '../../seconds-to-interval.pipe';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { FastInputButton, ValueOperationType } from '../../models';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

type InputType = null | 'days' | 'hours' | 'minutes' | 'seconds' | 'ms';

@Component({
  selector: 'sim-utils-time-picker',
  template: `
    <div class="mb-3 mt-8 select-none">
      <div class="p-3 relative bg-gray-50 dark:bg-gray-900">
        <fa-icon size="lg" [icon]="questionIcon" class="absolute -top-5 left-0 p-5" (click)="tooltip.toggle()"
                 #tooltip="matTooltip"
                 matTooltip="Set the time with the slider or click on the pencil to set one / use the input and type in with the keyboard (Tab / Shift+Tab & Arrows also works!)"
                 matTooltipPosition="above"
        ></fa-icon>
        <fa-icon size="2x" [icon]="clearIcon" class="absolute -top-7 right-0 px-5" (click)="clear()"
                 matTooltip="Resets the time" matTooltipPosition="above"></fa-icon>
        <mat-label class="w-full text-gray-500 dark:text-gray-300 block text-center -mb-3" [class.text-black]="activeInput !== null">
          <ng-container *ngIf="activeInput">
            Slide to change: {{sliderValue}} {{activeInput}}
          </ng-container>
          <ng-container *ngIf="!activeInput">
            {{inputTitle}} {{duration.durationInSeconds | secondsToInterval}}
          </ng-container>
        </mat-label>
        <mat-slider
          class="w-full"
          thumbLabel
          [(ngModel)]="sliderValue"
          [step]="sliderStep"
          [min]="sliderMin"
          [max]="sliderMax"
          (change)="sliderUpdate($event.value)"
          (blur)="setSliderMode(null)"
          [displayWith]="activeInput ? noTransformPipe(activeInput)  : secondFromatPipe.transform"
        >
        </mat-slider>
      </div>
      <div class="grid grid-cols-3 gap-3 px-5 pt-5 -mt-12 bg-gray-50 dark:bg-gray-900">
        <mat-form-field *ngIf="enableDays" [appearance]="activeInput === 'days' ? 'outline' : 'standard'">
          <mat-label>Days</mat-label>
          <input type="number" min="0" (change)="updateSecondsFromTime()" [(ngModel)]="duration.days" matInput>
          <fa-icon [icon]="editIcon" matSuffix (click)="inputClicked($event, 'days')"></fa-icon>
        </mat-form-field>
        <mat-form-field *ngIf="enableHours" [appearance]="activeInput === 'hours' ? 'outline' : 'standard'">
          <mat-label>Hours</mat-label>
          <input type="number" min="0" max="23" (change)="updateSecondsFromTime()" [(ngModel)]="duration.hours"
                 matInput>
          <fa-icon [icon]="editIcon" matSuffix (click)="inputClicked($event, 'hours')"></fa-icon>
        </mat-form-field>
        <mat-form-field *ngIf="enableMinutes" [appearance]="activeInput === 'minutes' ? 'outline' : 'standard'">
          <mat-label>Minutes</mat-label>
          <input type="number" min="0" max="59" (change)="updateSecondsFromTime()" [(ngModel)]="duration.minutes"
                 matInput>
          <fa-icon [icon]="editIcon" matSuffix (click)="inputClicked($event, 'minutes')"></fa-icon>
        </mat-form-field>
        <mat-form-field *ngIf="enableSeconds" [appearance]="activeInput === 'seconds' ? 'outline' : 'standard'">
          <mat-label>Seconds</mat-label>
          <input type="number" min="0" max="59" (change)="updateSecondsFromTime()" [(ngModel)]="duration.seconds"
                 matInput>
          <fa-icon [icon]="editIcon" matSuffix (click)="inputClicked($event, 'seconds')"></fa-icon>
        </mat-form-field>
        <mat-form-field *ngIf="enableMilisecs" [appearance]="activeInput === 'ms' ? 'outline' : 'standard'">
          <mat-label>Miliseconds</mat-label>
          <input type="number" min="0" max="999" step="50" (change)="updateSecondsFromTime()"
                 [(ngModel)]="duration.ms" matInput>
          <fa-icon [icon]="editIcon" matSuffix (click)="inputClicked($event, 'ms')"></fa-icon>
        </mat-form-field>
      </div>
      <div *ngIf="fastButtons.length > 0" class="text-center">
        <button mat-button *ngFor="let button of fastButtons"
                (click)="fastButtonClick(button)">{{button.title}}</button>
      </div>
    </div>
  `,
  styleUrls: ['./sim-utils-time-picker.component.scss']
})
export class SimUtilsTimePickerComponent implements OnInit {
  activeInput: InputType = null;
  activeValue = 0;

  editIcon = faPencilAlt;
  questionIcon = faQuestionCircle;
  clearIcon = faRedo;

  enableDays = false;
  enableHours = false;
  enableMinutes = true;
  enableSeconds = true;
  enableMilisecs = true;

  @Input() class = '';

  /**
   * Displays text above the slider
   */
  @Input() inputTitle = 'Duration: ';

  @Input() set min(val: number) {
    this.sliderMin = val;
    this.sliderDefaultMin = val;
  };

  @Input() set max(val: number) {
    this.sliderMax = val;
    this.sliderDefaultMax = val;
  };

  @Input() set step(val: number) {
    this.sliderStep = val;
    this.sliderDefaultStep = val;
  };

  @Input() fastButtons: FastInputButton[] = [];

  sliderDefaultMin = 0;
  sliderDefaultMax = 60;
  sliderDefaultStep = 1;

  sliderMin = 0;
  sliderMax = 60;
  sliderStep = 1;

  sliderValue = 0;

  @Input() duration: TimeDuration = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
    durationInSeconds: 0
  }

  @Output() durationChanged = new EventEmitter<TimeDuration>();

  @Input() set durationInSeconds(second: number) {
    // TODO: implement :D
  }

  public secondFromatPipe = new SecondsToIntervalPipe();

  noTransformPipe = (type: InputType) => (data: number) => `${data} ${type}`

  inputClicked(e: MouseEvent, inputType: InputType) {
    e.stopImmediatePropagation();
    this.setSliderMode(inputType);
  }

  setSliderMode(type: InputType) {
    if (this.activeInput === type) {
      this.activeInput = null;
    } else {
      this.activeInput = type;
    }

    switch (type) {
      case 'days':
        this.sliderMin = 0;
        this.sliderMax = 4;
        this.sliderStep = 1;
        this.sliderValue = this.duration.days || 0;
        return;
      case 'hours':
        this.sliderMin = 0;
        this.sliderMax = 23;
        this.sliderStep = 1;
        this.sliderValue = this.duration.hours || 0;
        return;
      case 'minutes':
        this.sliderMin = 0;
        this.sliderMax = 59;
        this.sliderStep = 1;
        this.sliderValue = this.duration.minutes || 0;
        return;
      case 'seconds':
        this.sliderMin = 0;
        this.sliderMax = 59;
        this.sliderStep = 1;
        this.sliderValue = this.duration.seconds || 0;
        return;
      case 'ms':
        this.sliderMin = 0;
        this.sliderMax = 999;
        this.sliderStep = 10;
        this.sliderValue = this.duration.ms || 0;
        return;
      default:
        this.sliderMin = this.sliderDefaultMin;
        this.sliderMax = this.sliderDefaultMax;
        this.sliderStep = this.sliderDefaultStep;
        this.sliderValue = this.duration.durationInSeconds || 0;
        break;
    }
  }

  ngOnInit(): void {
    this.enableDays = this.sliderDefaultMax >= 3600 * 24;
    this.enableHours = this.sliderDefaultMax >= 3600;
    this.enableMinutes = this.sliderDefaultMax >= 60;
    this.enableSeconds = this.sliderDefaultMax < 3600
    this.enableMilisecs = this.sliderDefaultMax < 600;
  }

  sliderUpdate(data: number | null) {
    if (data === null) {
      return;
    }

    if (this.activeInput === null) {
      return this.updateTimeFromSeconds(data);
    }

    this.duration[this.activeInput] = data;
    this.updateSecondsFromTime();
  }

  clear(onlySelf = false) {
    this.duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      ms: 0,
      durationInSeconds: 0
    }
    this.sliderValue = 0;
    this.activeInput = null;
    if (!onlySelf) this.durationChanged.emit(this.duration);
  }

  updateTimeFromSeconds(seconds: number) {

    const duration = intervalToDuration({start: 0, end: seconds * 1000});

    this.duration = {
      ...duration,
      ms: Math.round((seconds % 1) * 1000),
      durationInSeconds: seconds
    };

    this.durationChanged.emit(this.duration);
  }

  updateSecondsFromTime() {
    this.duration.durationInSeconds =
      (this.duration.days ?? 0) * 3600 * 24 +
      (this.duration.hours ?? 0) * 3600 +
      (this.duration.minutes ?? 0) * 60 +
      (this.duration.seconds ?? 0) +
      (this.duration.ms ?? 0) / 1000;

    this.durationChanged.emit(this.duration);
  }

  private setSecondsSelf(second: number) {
    this.clear(true);
    this.sliderValue = second;
    this.updateTimeFromSeconds(second);
  }

  fastButtonClick(button: FastInputButton) {
    if (button?.type && button.type == ValueOperationType.Replace) {
      return this.setSecondsSelf(button.value);
    }
    return this.setSecondsSelf(this.duration.durationInSeconds + button.value);
  }
}
