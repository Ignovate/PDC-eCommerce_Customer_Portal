import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressComponent } from './address.component';

describe('CustomerAddressComponent', () => {
  let component: CustomerAddressComponent;
  let fixture: ComponentFixture<CustomerAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
