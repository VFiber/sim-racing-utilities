import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimUtilsTimePickerComponent } from './sim-utils-time-picker.component';

describe('SimUtilsTimePickerComponent', () => {
  let component: SimUtilsTimePickerComponent;
  let fixture: ComponentFixture<SimUtilsTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimUtilsTimePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimUtilsTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
