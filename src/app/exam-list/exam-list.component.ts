import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  pageOfExams: Array<any> = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalElements!: number;


  pageSizes = [
    { id: 1, size: 2 },
    { id: 2, size: 5 },
    { id: 3, size: 10 }
  ];

  constructor(private examService: ExamService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getExams(0);
  }

  localStorageItem(id: string): any {
    return localStorage.getItem(id);
  }

  private getExams(page: number) {
    let role = localStorage.getItem('ROLE') as string;
    if (['ROLE_ADMIN', 'ROLE_TEACHER'].includes(role)) {
      this.examService.getExamList(page, this.itemsPerPage).subscribe((response: any) => {
        this.pageOfExams = response.content;
        this.totalElements = response.totalElements;
      });
    }
    else if (role == 'ROLE_STUDENT') {
      this.getExamsForStudent(0);
    }
  }

  private getExamsForStudent(page: number) {
    let studentId = this.tokenService.getUserId();
    this.examService.getExamListForStudent(studentId, page, this.itemsPerPage).subscribe((response: any) => {
      this.pageOfExams = response.content;
      this.totalElements = response.totalElements;
    });
  }

  onChangePage(newPage: number) {
    // update current page of items
    this.currentPage = newPage;
    // sending newPage-1 bcs back-end handles
    // paging from 0 while for front-end current
    // page needs to be set to exact number
    let role = localStorage.getItem('ROLE') as string;
    if (['ROLE_ADMIN', 'ROLE_TEACHER'].includes(role)) {
      this.getExams(newPage - 1);
    }
    else if (role == 'ROLE_STUDENT') {
      this.getExamsForStudent(newPage - 1);
    }
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.onChangePage(1);
  }

}
