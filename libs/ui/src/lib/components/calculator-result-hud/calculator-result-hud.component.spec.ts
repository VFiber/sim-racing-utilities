import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorResultHudComponent } from './calculator-result-hud.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy } from '@angular/core';
import { SecondsToIntervalPipe } from '../../seconds-to-interval.pipe';

describe('CalculatorResultHudComponent', () => {
  let component: CalculatorResultHudComponent;
  let fixture: ComponentFixture<CalculatorResultHudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
      ],
      declarations: [
        CalculatorResultHudComponent,
        SecondsToIntervalPipe
      ],
      providers: [
        SecondsToIntervalPipe
      ]
    })
      // if we don't do this, input data won't trigger any change in component
      .overrideComponent(CalculatorResultHudComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorResultHudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fuel and a ? on init', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Fuel');
    expect(compiled.textContent).toContain('Exact');
    expect(compiled.textContent).toContain('Duration');
    expect(compiled.textContent).toContain('Laps');
  });

  it('should display laps after laps set', async () => {
    fixture.componentInstance.lapCount = 10.001;
    fixture.componentInstance.fuelPerLap = 1;
    fixture.componentInstance.raceTimeInSeconds = 100;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const digits = compiled.querySelectorAll('.digits');

    expect(digits[0].textContent).toContain('11');
    expect(digits[1].textContent).toContain('10');
    expect(digits[2].textContent).toContain('1m 40s');
    expect(digits[3].textContent).toContain('10');

  });

});
