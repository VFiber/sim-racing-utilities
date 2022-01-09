import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideInputComponent } from './slide-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { FormsModule } from '@angular/forms';

describe('SlideInputComponent', () => {
  let component: SlideInputComponent;
  let fixture: ComponentFixture<SlideInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        MatSliderModule,
        FontAwesomeTestingModule,
        FormsModule
      ],
      declarations: [ SlideInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
