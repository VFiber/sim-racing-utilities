import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FuelCalculatorPageComponent} from './fuel-calculator-page.component';
import {FuelCalculatorComponent} from '../../components/fuel-calculator/fuel-calculator.component';
import {provideMockStore} from '@ngrx/store/testing';
import {ReactiveComponentModule} from '@ngrx/component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {UiModule} from '@sim-utils/ui';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SelectCalculator} from '../../state';
import {initialState} from '../../state/calculator.reducer';
import {RouterTestingModule} from "@angular/router/testing";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

describe('FuelCalculatorPageComponent', () => {
  let component: FuelCalculatorPageComponent;
  let fixture: ComponentFixture<FuelCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        UiModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        ReactiveComponentModule,
        RouterTestingModule,
        MatInputModule,
        FormsModule
      ],
      declarations: [
        FuelCalculatorPageComponent,
        FuelCalculatorComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: SelectCalculator.state,
              value: initialState
            }]
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
