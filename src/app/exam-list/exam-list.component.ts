import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamService } from '../_services/exam.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  pageOfExams: Array<any> = [];
  routeSub!: Subscription;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalElements!: number;
  examType: string = '';
  viewType: string = 'passed';
  resultMsg: string = '';

  pageSizes = [
    { id: 1, size: 5 },
    { id: 2, size: 10 },
    { id: 3, size: 20 }
  ];

  constructor(private route: ActivatedRoute,
    private examService: ExamService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.examType = params['examType'];
      this.getExams(0);
    });
  }

  // unsubscribe to prevent memory leaks
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  localStorageItem(id: string): any {
    return localStorage.getItem(id);
  }

  private getExams(page: number) {
    let role = localStorage.getItem('ROLE') as string;
    if (['ROLE_ADMIN', 'ROLE_TEACHER'].includes(role)) {
      this.examService.getExamList(page, this.itemsPerPage, this.examType, this.viewType).subscribe((response: any) => {
        this.pageOfExams = response.content;
        this.totalElements = response.content.size;
        if (response.totalElements == 0) {
          this.resultMsg = 'There are no exams';
        }
        else {
          this.resultMsg = '';
        }
      });
    }
    else if (role == 'ROLE_STUDENT') {
      this.getExamsForStudent(0);
    }
  }

  private getExamsForStudent(page: number) {
    let studentId = this.tokenService.getUserId();
    this.examService.getExamListForStudent(studentId, page, this.itemsPerPage, this.examType, this.viewType).subscribe((response: any) => {
      this.pageOfExams = response.content;
      this.totalElements = response.content.size;
      if (response.totalElements == 0) {
        this.resultMsg = 'You have no exams';
      }
      else {
        this.resultMsg = '';
      }
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

  onChangeExamView(viewType: string) {
    this.viewType = viewType;
    this.onChangePage(1);
  }

  onCancelExam(examId: any) {
    this.examService.cancelExam(examId).subscribe((response: any) => {
      this.getExams(0);
    });
  }

}
