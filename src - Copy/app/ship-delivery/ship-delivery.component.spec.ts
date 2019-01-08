import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDeliveryComponent } from './ship-delivery.component';

describe('ShipDeliveryComponent', () => {
  let component: ShipDeliveryComponent;
  let fixture: ComponentFixture<ShipDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
