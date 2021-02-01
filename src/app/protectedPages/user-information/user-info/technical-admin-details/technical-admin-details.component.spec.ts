import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAdminDetailsComponent } from './technical-admin-details.component';

describe('TechnicalAdminDetailsComponent', () => {
  let component: TechnicalAdminDetailsComponent;
  let fixture: ComponentFixture<TechnicalAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

 