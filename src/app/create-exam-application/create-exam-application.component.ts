import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamSchedule } from '../_models/exam-schedule';
import { Student } from '../_models/student';
import { ExamScheduleService } from '../_services/exam-schedule.service';
import { ExamService } from '../_services/exam.service';
import { StudentService } from '../_services/student.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-create-exam-application',
  templateUrl: './create-exam-application.component.html',
  styleUrls: ['./create-exam-application.component.css']
})
export class CreateExamApplicationComponent implements OnInit {
  students: Student[] = [];
  examSchedules: ExamSchedule[] = [];
  role: string = '';
  studentId!: number;
  examScheduleId!: any;
  resultMsg: string = '';
  funds!: number;

  constructor(private examScheduleService: ExamScheduleService,
    private studentService: StudentService,
    private examService: ExamService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    // if authorized user is admin then he can choose for
    // which student to register exam, fetching examSchedules
    // is only done after selecting student
    const role = localStorage.getItem('ROLE');
    if (role == 'ROLE_ADMIN') {
      this.role = role;
      this.studentService.getAllStudents().subscribe(
        data => {
          this.students = data;
        },
        error => {
          console.log(error);
        }
      )
    }
    // if authorized user is student then he can only
    // register exam for himself, no need for fetching
    // other students, also fetching examSchedules for
    // students
    else if (role == 'ROLE_STUDENT') {
      this.getExamSchedules(null);
      this.studentId = this.tokenService.getUserId();
      this.getStudent(this.studentId);
    }
  }

  getStudent(studentId: number) {
    this.studentService.getStudent(studentId).subscribe(
      data => {
        this.funds = data.funds;
      },
      error => {
        console.log(error);
      }
    )
  }

  getExamSchedules(studentId: any) {
    this.examScheduleService.getAllExamSchedules(studentId).subscribe(
      data => {
        this.examSchedules = data;
        if (this.examSchedules.length == 0) {
          this.resultMsg = 'There are no available subjects for registration';
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    if (this.examSchedules.length == 0 && this.studentId != null) {
      return;
    }
    if (this.studentId == null) {
      this.resultMsg = 'Please select student';
      return;
    }
    if (this.examScheduleId == null) {
      this.resultMsg = 'Please select exam schedule';
      return;
    }
    this.examService.createExamApplication(this.studentId, this.examScheduleId).subscribe(
      data => {
        this.router.navigate(['/exams/unfinished']);
      },
      error => {
        console.log(error.status);
      }
    );
  }

  onChangeStudent(student: Student) {
    this.resultMsg = '';
    this.getExamSchedules(student.userDTO.id);
    this.studentId = student.userDTO.id;
    this.funds = student.funds;
    this.examScheduleId = null;
  }

  onChangeExamSchedule(examSchedule: ExamSchedule) {
    this.resultMsg = '';
    this.examScheduleId = examSchedule.id;
  }

}
