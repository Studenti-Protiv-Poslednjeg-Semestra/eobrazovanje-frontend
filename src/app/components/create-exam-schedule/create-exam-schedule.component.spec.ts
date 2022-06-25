import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamScheduleComponent } from './create-exam-schedule.component';

describe('CreateExamScheduleComponent', () => {
  let component: CreateExamScheduleComponent;
  let fixture: ComponentFixture<CreateExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExamScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
