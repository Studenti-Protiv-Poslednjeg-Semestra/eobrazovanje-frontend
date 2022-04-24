import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../_models/exam';
import { ExamSchedule } from '../_models/exam-schedule';
import { ExamScheduleService } from '../_services/exam-schedule.service';
import { ExamService } from '../_services/exam.service';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {
  id!: number;
  exam: Exam = new Exam();
  examSchedules: ExamSchedule[] = [];
  editable: boolean = false;
  finished!: boolean;

  constructor(private examService: ExamService,
    private examScheduleService: ExamScheduleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.examService.getExamById(this.id).subscribe(
      response => {
        if (response.status == 200 && response.body != null) {
          this.exam = response.body;
          let examDate = Date.parse(this.exam.examScheduleDTO.timeOfExam);
          // setting time and place of exam editable or not if it's finished or not
          if (examDate > Date.now()) {
            this.finished = false;
          }
          else {
            this.finished = true;
          }
          // setting edit button visible if role is teacher or admin and teacher is authorized
          // for the exam which can be edited
          let role = localStorage.getItem('ROLE')
          if (role != 'ROLE_STUDENT') {
            this.editable = true;
          }

          this.getExamSchedulesForSubject(this.exam.examScheduleDTO.subjectDTO.id);
        }

        else {
          console.log(response.statusText);
        }
      }
    )
  }

  getExamSchedulesForSubject(subjectId: any) {
    this.examScheduleService.getAllExamSchedulesForSubject(subjectId).subscribe(
      data => {
        this.examSchedules = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onEdit() {
    this.examService.updateExam(this.exam.id, this.exam).subscribe(
      data => {
        this.router.navigate(['/exams/finished']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChangeExamSchedule(examSchedule: ExamSchedule) {
    this.exam.examScheduleDTO = examSchedule;
  }
}
