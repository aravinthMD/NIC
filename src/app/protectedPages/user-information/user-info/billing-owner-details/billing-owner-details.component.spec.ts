import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingOwnerDetailsComponent } from './billing-owner-details.component';

describe('BillingOwnerDetailsComponent', () => {
  let component: BillingOwnerDetailsComponent;
  let fixture: ComponentFixture<BillingOwnerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingOwnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingOwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

 