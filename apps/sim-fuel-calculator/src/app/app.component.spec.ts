import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FuelCalculatorPageComponent } from './pages';
import { FuelCalculatorComponent } from './components/fuel-calculator/fuel-calculator.component';
import { UiModule } from '@sim-utils/ui';
import { provideMockStore } from '@ngrx/store/testing';
import { SelectCalculator } from './state';
import { initialState } from './state/calculator.reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FuelCalculatorComponent,
        FuelCalculatorPageComponent
      ],
      imports: [
        UiModule,
        NoopAnimationsModule,
        MatButtonToggleModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatTooltipModule,
        ReactiveComponentModule
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
    }).compileComponents();

    // a matchMedia a jsDom-nak nem része
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')?.textContent).toContain(
      'SimRacing fuel calculator'
    );
  });
});
