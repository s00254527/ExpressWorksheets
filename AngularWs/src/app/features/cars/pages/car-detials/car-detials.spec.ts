import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetials } from './car-detials';

describe('CarDetials', () => {
  let component: CarDetials;
  let fixture: ComponentFixture<CarDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetials],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
