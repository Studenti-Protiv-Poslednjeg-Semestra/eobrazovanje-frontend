import { Component, OnInit } from '@angular/core';
import {Enrollment} from "../../_models/enrollment";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../_services/token.service";
import {EnrollmentService} from "../../_services/enrollment.service";

@Component({
  selector: 'app-view-enrollments',
  templateUrl: './view-enrollments.component.html',
  styleUrls: ['./view-enrollments.component.css']
})
export class ViewEnrollmentsComponent implements OnInit {

  enrollments: Enrollment[] = []
  routeSub!: Subscription;
  currentPage: number = 1
  itemsPerPage: number = 5
  totalElements!: number
  totalPageNumber: Array<any> = []
  resultMessage: string = ""
  studentId!: number

  pageSizes = [
    { id: 1, size: 5 },
    { id: 2, size: 10 },
    { id: 3, size: 20 }
  ];

  constructor(private route: ActivatedRoute,
              private enrollmentService: EnrollmentService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.routeSub  = this.route.params.subscribe(params => {
      if(!params["studentId"]) {
        this.studentId = this.tokenService.getUserId()
        this.getEnrollments(this.tokenService.getUserId(), 0)
      }else {
        this.studentId = params["studentId"]
        this.getEnrollments(params["studentId"], 0)
      }
    })
  }

  getEnrollments(studentId: number, page: number){
    this.enrollmentService.getEnrollmentsForStudent(studentId, page, this.itemsPerPage).subscribe((data: any) => {
      data ? this.enrollments = data.content : this.resultMessage = "Something went wrong"
      this.totalElements = data.content.size
      if (this.totalElements == 0) {
        this.resultMessage = "There is no payments"
      } else {
        this.resultMessage = ""
      }
    })
  }

  onChangePage(newPage: number) {
    this.currentPage = newPage
    this.getEnrollments(this.studentId, newPage - 1)
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.onChangePage(1);
  }

}
