import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalculatorComponent } from './fuel-calculator.component';

describe('FuelCalculatorComponent', () => {
  let component: FuelCalculatorComponent;
  let fixture: ComponentFixture<FuelCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelCalculatorComponent ]
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
});
