import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enrollment} from "../_models/enrollment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private baseURL = "http://localhost:8080/api/v1/enrollments";

  constructor(private httpClient: HttpClient) { }

  getEnrollmentsForStudent(studentId: number, page: number, size: number): Observable<Enrollment[]>{
    return this.httpClient.get<Enrollment[]>(`${this.baseURL}/${studentId}?page=${page}&itemsPerPage=${size}`)
  }
}
