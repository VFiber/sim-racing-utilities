import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CalculatorResultHudComponent, SimUtilsTimePickerComponent, SlideInputComponent } from './components';
import { SecondsToIntervalPipe } from './seconds-to-interval.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatButtonModule
  ],
  declarations: [
    SimUtilsTimePickerComponent,
    SecondsToIntervalPipe,
    SlideInputComponent,
    CalculatorResultHudComponent
  ],
  exports: [
    SimUtilsTimePickerComponent,
    SecondsToIntervalPipe,
    SlideInputComponent,
    CalculatorResultHudComponent
  ],
  providers: [
    SecondsToIntervalPipe
  ]
})
export class UiModule {
}
