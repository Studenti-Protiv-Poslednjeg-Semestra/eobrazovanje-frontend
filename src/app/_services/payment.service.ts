import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payment} from "../_models/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseURL = "http://localhost:8080/api/v1/payments";

  constructor(private httpClient: HttpClient) { }

  getPaymentsForStudent(studentId: number, page: number, size: number): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.baseURL}/${studentId}?page=${page}&size=${size}`);
  }

  createPayment(payment: Object): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseURL}`, payment);
  }
}
