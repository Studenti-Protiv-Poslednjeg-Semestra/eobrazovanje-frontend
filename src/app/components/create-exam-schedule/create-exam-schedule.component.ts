import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamSchedule } from '../../_models/exam-schedule';
import { ExaminationPeriod } from '../../_models/examination-period';
import { Subject } from '../../_models/subject';
import { ExamScheduleService } from '../../_services/exam-schedule.service';
import { ExaminationPeriodService } from '../../_services/examination-period.service';
import { SubjectService } from '../../_services/subject.service';

@Component({
  selector: 'app-create-exam-schedule',
  templateUrl: './create-exam-schedule.component.html',
  styleUrls: ['./create-exam-schedule.component.css']
})
export class CreateExamScheduleComponent implements OnInit {
  examSchedule: ExamSchedule = new ExamSchedule();
  subjects: Subject[] = [];
  examinationPeriods: ExaminationPeriod[] = [];
  resultMsg: string = '';


  constructor(private examScheduleService: ExamScheduleService,
    private subjectService: SubjectService,
    private examinationPeriodService: ExaminationPeriodService,
    private router: Router) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(
      data => {
        this.subjects = data;
        if (this.subjects.length == 0) {
          this.resultMsg += 'There are no available subjects'
        }
      },
      error => {
        console.log(error);
      }
    );

    this.examinationPeriodService.getAllExamPeriods().subscribe(
      data => {
        this.examinationPeriods = data;
        if (this.examinationPeriods.length == 0) {
          this.resultMsg += '\nThere are no available examination periods'
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit = async () => {
    const timeOfExam = <HTMLInputElement>document.getElementById("timeOfExam");
    this.examSchedule.timeOfExam = timeOfExam.value;

    if (timeOfExam.value == '' || this.examSchedule.place == '' ||
      this.examSchedule.subjectDTO == null || this.examSchedule.examinationPeriodDTO == null) {
      this.resultMsg = 'All fields must be entered';
      return;
    }

    let examDate = Date.parse(timeOfExam.value);
    // setting time and place of exam editable or not if it's finished or not
    if (examDate < Date.now()) {
      this.resultMsg = 'Please enter correct date and time and try again';
      return;
    }

    this.examScheduleService.createExamSchedule(this.examSchedule).subscribe(
      data => {
        this.router.navigate(['/exams/application']);
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
