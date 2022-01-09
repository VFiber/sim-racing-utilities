import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimUtilsTimePickerComponent } from './sim-utils-time-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SecondsToIntervalPipe } from '../../seconds-to-interval.pipe';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { FormsModule } from '@angular/forms';

describe('SimUtilsTimePickerComponent', () => {
  let component: SimUtilsTimePickerComponent;
  let fixture: ComponentFixture<SimUtilsTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:
        [
          NoopAnimationsModule,
          MatFormFieldModule,
          MatSliderModule,
          MatTooltipModule,
          MatInputModule,
          FontAwesomeTestingModule,
          FormsModule
        ],
      declarations: [
        SimUtilsTimePickerComponent,
        SecondsToIntervalPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimUtilsTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: decent tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
