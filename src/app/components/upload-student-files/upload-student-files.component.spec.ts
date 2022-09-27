import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentFilesComponent } from './upload-student-files.component';

describe('UploadStudentFilesComponent', () => {
  let component: UploadStudentFilesComponent;
  let fixture: ComponentFixture<UploadStudentFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadStudentFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadStudentFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
