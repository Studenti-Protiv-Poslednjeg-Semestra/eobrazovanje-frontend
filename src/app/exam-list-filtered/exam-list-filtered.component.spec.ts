import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamListFilteredComponent } from './exam-list-filtered.component';

describe('ExamListFilteredComponent', () => {
  let component: ExamListFilteredComponent;
  let fixture: ComponentFixture<ExamListFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamListFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamListFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
