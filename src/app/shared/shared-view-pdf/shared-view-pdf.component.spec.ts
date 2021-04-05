import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedViewPdfComponent } from './shared-view-pdf.component';

describe('SharedViewPdfComponent', () => {
  let component: SharedViewPdfComponent;
  let fixture: ComponentFixture<SharedViewPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedViewPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
