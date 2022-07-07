import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../_services/student.service";
import {TokenService} from "../../_services/token.service";
import {Student} from "../../_models/student";

@Component({
  selector: 'app-enrollment-on-next-semester',
  templateUrl: './enrollment-on-next-semester.component.html',
  styleUrls: ['./enrollment-on-next-semester.component.css']
})
export class EnrollmentOnNextSemesterComponent implements OnInit {

  studentId!: number
  numberOfFinishedExams!: number
  student!: Student
  enoughExams!: boolean

  constructor(private studentService: StudentService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.studentId = this.tokenService.getUserId()
    this.studentService.getNumberOfFinishedExams(this.studentId).subscribe((data) => {
      this.numberOfFinishedExams = <number>data
    })
    this.studentService.getStudent(this.studentId).subscribe((data: Student) => {
      this.student = data
      this.enoughExams = this.numberOfFinishedExams >= (this.student.semester * 2)
      console.log(this.numberOfFinishedExams)
    })
  }

  onClick() {
    this.studentService.enrollmentOnNextSemester(this.studentId).subscribe((data: Student) => {
      console.log(data)
    })
    this.enoughExams = false
  }

}
