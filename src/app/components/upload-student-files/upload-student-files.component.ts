import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../_services/student.service";
import {Student} from "../../_models/student";
import {Major} from "../../_models/major";
import {debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-upload-student-files',
  templateUrl: './upload-student-files.component.html',
  styleUrls: ['./upload-student-files.component.css']
})
export class UploadStudentFilesComponent implements OnInit {

  students: Student[] = [];
  selectedStudent!: Student;
  fileToUpload!: undefined;
  // Tuple type variable
  upload!: [File, number];
  resultMsg: string = '';

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next: (v) => this.students = v
    })
  }

  formatter = (student: Student) => student.userDTO.firstName + " " + student.userDTO.lastName + " " + student.userDTO.ucn;

  search: (text$: Observable<string>) => Observable<Student[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.students.filter(student => new RegExp(term, 'mi').test(student.userDTO.firstName + student.userDTO.lastName + student.userDTO.ucn)).slice(0, 10))
  );

  handleFileInput(e: Event) {
    // @ts-ignore
    this.fileToUpload = (<HTMLInputElement>e.target).files[0];

  }

  onSubmit(payloadForm: NgForm) {

    if(this.isPayloadValid()) {
      this.upload = [this.fileToUpload!, this.selectedStudent.userDTO.id];
      this.studentService.uploadStudentFile(this.upload).subscribe({
        error: (e) => {
          console.log(e);
        },
        complete:() => {
          this.resultMsg = "File uploaded!";
          this.fileToUpload = undefined;
          payloadForm.reset();
        }
      });
    } else {
      return;
    }
  }

  isPayloadValid() {
    this.resultMsg = "";
    let valid = true;

    if(this.fileToUpload == undefined) {
      this.resultMsg += "Please upload a file!";
      valid = false;
    }

    if(this.selectedStudent == undefined) {
      this.resultMsg += "Please select a student!"
      valid = false;
    }

    return valid;
  }

  print() {
    console.log(this.selectedStudent)
  }
}
