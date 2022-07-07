import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../_services/student.service";
import {PaymentService} from "../../_services/payment.service";
import {TokenService} from "../../_services/token.service";
import {Router} from "@angular/router";
import {Payment} from "../../_models/payment";
import {Student} from "../../_models/student";

@Component({
  selector: 'app-add-money-on-account',
  templateUrl: './add-money-on-account.component.html',
  styleUrls: ['./add-money-on-account.component.css']
})
export class AddMoneyOnAccountComponent implements OnInit {

  payment: Payment = new Payment()
  amount: number = 0
  reason: string = ""
  student!: Student
  warning: string = ""

  constructor(private studentService: StudentService,
              private paymentService: PaymentService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if (this.amount <= 0 || this.reason === ""){
      this.warning = "All fields are required"
      return
    }

    let request = {
      reasonForPayment: this.reason,
      amount: this.amount,
      studentId: this.tokenService.getUserId()
    }

    this.paymentService.createPayment(request).subscribe((data: Object) => {
      console.log(data)
    })
    this.router.navigate(["/payments"])
  }

}
