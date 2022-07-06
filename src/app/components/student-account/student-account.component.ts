import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../_services/payment.service";
import {TokenService} from "../../_services/token.service";
import {ActivatedRoute} from "@angular/router";
import {Payment} from "../../_models/payment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.css']
})
export class StudentAccountComponent implements OnInit {

  payments: Payment[] = []
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
              private paymentService: PaymentService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.routeSub  = this.route.params.subscribe(params => {
      if(!params["studentId"]) {
        this.studentId = this.tokenService.getUserId()
        this.getPayments(0, this.tokenService.getUserId())
      }else {
        this.studentId = params["studentId"]
        this.getPayments(0, params["studentId"])
      }
    })
  }

  getPayments(page: number, studentId: number) {
    this.paymentService.getPaymentsForStudent(studentId, page, this.itemsPerPage).subscribe((data: Payment[]) => {
      data ? this.payments = data : this.resultMessage = "Something went wrong"
      this.totalElements = data.length
      if (this.totalElements == 0) {
        this.resultMessage = "There is no payments"
      } else {
        this.resultMessage = ""
      }
    })
  }

  onChangePage(newPage: number) {
    this.currentPage = newPage
    this.getPayments(newPage - 1,this.studentId)
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.onChangePage(1);
  }

}
