import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimUtilsTimePickerComponent } from './components/sim-utils-time-picker/sim-utils-time-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { SecondsToIntervalPipe } from './seconds-to-interval.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SlideInputComponent } from './components/slide-input/slide-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  declarations: [
    SimUtilsTimePickerComponent,
    SecondsToIntervalPipe,
    SlideInputComponent
  ],
  exports: [
    SimUtilsTimePickerComponent,
    SecondsToIntervalPipe,
    SlideInputComponent
  ],
  providers: [
    SecondsToIntervalPipe
  ]
})
export class UiModule {
}
