import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private examService: ExamService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.examService.getExamById(this.id).subscribe(
      data => {
        this.exam = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
