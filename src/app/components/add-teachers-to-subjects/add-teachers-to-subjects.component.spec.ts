import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachersToSubjectsComponent } from './add-teachers-to-subjects.component';

describe('AddTeachersToSubjectsComponent', () => {
  let component: AddTeachersToSubjectsComponent;
  let fixture: ComponentFixture<AddTeachersToSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeachersToSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeachersToSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
