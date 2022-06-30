import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsToSyllabusComponent } from './add-students-to-syllabus.component';

describe('AddStudentsToSyllabusComponent', () => {
  let component: AddStudentsToSyllabusComponent;
  let fixture: ComponentFixture<AddStudentsToSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsToSyllabusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsToSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
