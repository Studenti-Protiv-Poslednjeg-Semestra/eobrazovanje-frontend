import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamApplicationComponent } from './create-exam-application.component';

describe('CreateExamApplicationComponent', () => {
  let component: CreateExamApplicationComponent;
  let fixture: ComponentFixture<CreateExamApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExamApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExamApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
