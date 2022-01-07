import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

@Component({
  selector: 'sim-utils-slide-input',
  template: `
    <div class="mb-3 mt-8 select-none p-3 relative bg-gray-50 grid grid-cols-3 gap-3">
      <fa-icon size="lg" [icon]="questionIcon" class="absolute -top-5 left-0 p-5" (click)="tooltip.toggle()"
               #tooltip="matTooltip"
               matTooltip="Use the slider / use the input and type in with the keyboard (Tab / Shift+Tab & Arrows also works!)"
               matTooltipPosition="above"
      ></fa-icon>
      <fa-icon size="2x" [icon]="clearIcon" class="absolute -top-7 right-0 px-5" (click)="clear()" matTooltip="Resets to 0" matTooltipPosition="above"></fa-icon>
      <div class="col-span-3">
        <mat-label class="w-full text-gray-500 block text-center -mb-3">
          {{label}} - {{value}}
        </mat-label>
        <mat-slider class="w-full" thumbLabel [min]="min" [max]="sliderMax ?? max" [step]="sliderStep ?? step"
                    [(ngModel)]="value"
                    (change)="valueUpdated()"></mat-slider>
      </div>
      <div class="col-start-2 -mt-7">
        <mat-form-field class="w-full">
          <mat-label *ngIf="label">{{label}}</mat-label>
          <input [min]="min ?? null" [max]="inputMax ?? max ?? null" [step]="step ?? inputStep" matInput type="number"
                 [(ngModel)]="value"
                 (change)="valueUpdated()">
        </mat-form-field>
      </div>
    </div>
  `,
  styleUrls: ['./slide-input.component.scss']
})
export class SlideInputComponent implements ControlValueAccessor {
  questionIcon = faQuestionCircle;
  clearIcon = faTimesCircle;

  private onChange = (value: unknown) => null;
  private onTouched = () => null;

  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() sliderMax?: number | string;
  @Input() inputMax?: number | string;

  @Input() step?: number | string;
  @Input() sliderStep?: number;
  @Input() inputStep?: number | string;
  @Input() label?: string = '';

  @Input() value?: number;

  @Output() valueChange = new EventEmitter<number>();

  clear() {
    this.value = 0;
    this.valueUpdated();
  }

  valueUpdated() {
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }


}
