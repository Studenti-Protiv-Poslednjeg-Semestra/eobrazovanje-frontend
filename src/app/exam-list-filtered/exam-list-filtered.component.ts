import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamService } from '../_services/exam.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-exam-list-filtered',
  templateUrl: './exam-list-filtered.component.html',
  styleUrls: ['./exam-list-filtered.component.css']
})
export class ExamListFilteredComponent implements OnInit {
  pageOfExams: Array<any> = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalElements!: number;
  routeSub!: Subscription;
  filterId!: number;
  filterType: string = '';
  title: string = '';
  examType: string = '';
  viewType: string = 'passed';
  resultMsg: string = '';

  pageSizes = [
    { id: 1, size: 5 },
    { id: 2, size: 10 },
    { id: 3, size: 20 }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.filterId = params['id'];
      this.examType = params['examType'];
    });

    let url = this.router.routerState.snapshot.url;
    if (url.includes('student')) {
      this.filterType = 'student';
      this.title = ' student with id: '+ this.filterId;
    }
    else if (url.includes('syllabus')) {
      this.filterType = 'syllabus';
      this.title = ' syllabus with id: ' + this.filterId;
    }

    this.getExams(0);
  }

  // unsubscribe to prevent memory leaks
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  localStorageItem(id: string): any {
    return localStorage.getItem(id);
  }

  private getExams(page: number) {
    if (this.filterType == 'student') {
      this.getExamsForStudent(this.filterId, page);
    }
    else if (this.filterType == 'syllabus') {
      this.getExamsForSyllabus(this.filterId, page);
    }
  }

  private getExamsForStudent(studentId: number, page: number) {
    this.examService.getExamListForStudent(studentId, page, this.itemsPerPage, this.examType, this.viewType).subscribe((response: any) => {
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

  private getExamsForSyllabus(syllabusId: number, page: number) {
    this.examService.getExamListForSyllabus(syllabusId, page, this.itemsPerPage, this.examType, this.viewType).subscribe((response: any) => {
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

  onChangePage(newPage: number) {
    // update current page of items
    this.currentPage = newPage;
    // sending newPage-1 bcs back-end handles
    // paging from 0 while for front-end current
    // page needs to be set to exact number
    this.getExams(newPage - 1);
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
