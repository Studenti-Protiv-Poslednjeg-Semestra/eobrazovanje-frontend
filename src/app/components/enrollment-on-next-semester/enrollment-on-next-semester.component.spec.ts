import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentOnNextSemesterComponent } from './enrollment-on-next-semester.component';

describe('EnrollmentOnNextSemesterComponent', () => {
  let component: EnrollmentOnNextSemesterComponent;
  let fixture: ComponentFixture<EnrollmentOnNextSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentOnNextSemesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentOnNextSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
