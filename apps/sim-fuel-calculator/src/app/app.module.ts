import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UiModule } from '@sim-utils/ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FuelCalculatorComponent } from './components/fuel-calculator/fuel-calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuelCalculatorPageComponent } from './pages';
import { CalculatorEffects } from './state/calculator.effects';
import { calculatorFeatureKey, reducer as CalculatorReducer } from './state/calculator.reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import * as fromExternalStorage from './state/exstorage/external-storage.reducer';
import { ExternalStorageEffects } from './state/exstorage/external-storage.effects';

@NgModule({
  declarations: [
    AppComponent,
    FuelCalculatorComponent,
    FuelCalculatorPageComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    UiModule,
    StoreModule.forRoot(
      {
        [calculatorFeatureKey]: CalculatorReducer,
        [fromExternalStorage.EXTERNAL_STORAGE_FEATURE_KEY]: fromExternalStorage.reducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([CalculatorEffects, ExternalStorageEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatTooltipModule,
    ReactiveComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
