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
  examScheduleId!: number;

  constructor(private examScheduleService: ExamScheduleService,
    private studentService: StudentService,
    private examService: ExamService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.examScheduleService.getAllExamSchedules().subscribe(
      data => {
        this.examSchedules = data;
      },
      error => {
        console.log(error);
      }
    )

    // if authorized user is admin then he can choose for
    // which student to register exam
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
    // other students
    else if (role == 'ROLE_STUDENT') {
      this.studentId = this.tokenService.getUserId();
    }

  }

  onSubmit = async () => {
    this.examService.createExamApplication(this.studentId, this.examScheduleId).subscribe(
      data => {
        this.router.navigate(['/exams']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChangeStudent(student: Student) {
    this.studentId = student.userDTO.id;
  }

  onChangeExamSchedule(examSchedule: ExamSchedule) {
    this.examScheduleId = examSchedule.id;
  }

}
