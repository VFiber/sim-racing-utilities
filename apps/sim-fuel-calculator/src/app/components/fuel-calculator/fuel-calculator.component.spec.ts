import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FuelCalculatorComponent } from './fuel-calculator.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@sim-utils/ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../state/calculator.reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import { SelectCalculator } from '../../state';

describe('FuelCalculatorComponent', () => {
  let component: FuelCalculatorComponent;
  let fixture: ComponentFixture<FuelCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonToggleModule,
        FormsModule,
        UiModule,
        MatFormFieldModule,
        ReactiveComponentModule
      ],
      declarations: [FuelCalculatorComponent],
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
    fixture = TestBed.createComponent(FuelCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for race type', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('mat-label.block')?.textContent
    )
      .toContain(
        'Race duration type'
      );

    expect(
      compiled.querySelector('.choose-racetype')?.textContent
    )
      .toContain(
        'Please choose race type'
      );
  });
});
