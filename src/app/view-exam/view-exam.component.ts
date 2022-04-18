import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {
  id!: number;
  exam: Exam = new Exam();
  editable: boolean = false;

  constructor(private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.examService.getExamById(this.id).subscribe(
      response => {
        if (response.status == 200 && response.body != null) {
          this.exam = response.body;
          // setting edit button visible if role is
          // teacher or admin and teacher is authorized
          // for the exam which can be edited
          let role = localStorage.getItem('ROLE')
          if (role != 'ROLE_STUDENT') {
            this.editable = true;
          }
        }
        else {
          console.log(response.statusText);
        }
      }
      /*data => {
        this.exam = data;
      },
      error => {
        console.log(error);
      }*/
    )
  }

  onEdit = async () => {
    this.examService.updateExam(this.exam.id, this.exam).subscribe(
      data => {
        this.router.navigate(['/exams']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
