import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCreditAllocationComponent } from './sms-credit-allocation.component';

describe('SmsCreditAllocationComponent', () => {
  let component: SmsCreditAllocationComponent;
  let fixture: ComponentFixture<SmsCreditAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsCreditAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCreditAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
