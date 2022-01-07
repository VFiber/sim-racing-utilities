import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalculatorPageComponent } from './fuel-calculator-page.component';

describe('FuelCalculatorPageComponent', () => {
  let component: FuelCalculatorPageComponent;
  let fixture: ComponentFixture<FuelCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelCalculatorPageComponent ]
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
