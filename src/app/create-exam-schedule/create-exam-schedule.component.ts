import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamSchedule } from '../_models/exam-schedule';
import { ExaminationPeriod } from '../_models/examination-period';
import { Subject } from '../_models/subject';
import { ExamScheduleService } from '../_services/exam-schedule.service';
import { ExaminationPeriodService } from '../_services/examination-period.service';
import { SubjectService } from '../_services/subject.service';

@Component({
  selector: 'app-create-exam-schedule',
  templateUrl: './create-exam-schedule.component.html',
  styleUrls: ['./create-exam-schedule.component.css']
})
export class CreateExamScheduleComponent implements OnInit {
  examSchedule: ExamSchedule = new ExamSchedule();
  subjects: Subject[] = [];
  examinationPeriods: ExaminationPeriod[] = [];

  constructor(private examScheduleService: ExamScheduleService,
    private subjectService: SubjectService,
    private examinationPeriodService: ExaminationPeriodService,
    private router: Router) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(
      data => {
        this.subjects = data;
        this.onChangeSubject(this.subjects[0]);
      },
      error => {
        console.log(error);
      }
    );

    this.examinationPeriodService.getAllExamPeriods().subscribe(
      data => {
        this.examinationPeriods = data;
        this.onChangeExaminationPeriod(this.examinationPeriods[0]);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit = async () => {
    const timeOfExam = <HTMLInputElement>document.getElementById("timeOfExam");
    this.examSchedule.timeOfExam = timeOfExam.value;
    
    this.examScheduleService.createExamSchedule(this.examSchedule).subscribe(
      data => {
        this.router.navigate(['/exam_schedules']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChangeExaminationPeriod(examinationPeriod: ExaminationPeriod) {
    this.examSchedule.examinationPeriodDTO = examinationPeriod;
  }

  onChangeSubject(subject: Subject) {
    this.examSchedule.subjectDTO = subject;
  }

}
