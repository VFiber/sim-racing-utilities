import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCars from './+state/cars.reducer';
import { CarsEffects } from './+state/cars.effects';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCars.CARS_FEATURE_KEY, fromCars.reducer),
    EffectsModule.forFeature([CarsEffects]),
    MatInputModule,
    MatListModule,
    ReactiveComponentModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    FlexModule,
    GridModule,
    MatTooltipModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule
  ],
  declarations: [
    CreateCarComponent
  ],
  exports: [
    CreateCarComponent
  ]
})
export class CreatorUtilitiesModule {}
