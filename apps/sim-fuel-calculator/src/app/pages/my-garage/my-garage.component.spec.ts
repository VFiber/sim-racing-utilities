import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGarageComponent } from './my-garage.component';

describe('MyGarageComponent', () => {
  let component: MyGarageComponent;
  let fixture: ComponentFixture<MyGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
