import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamSchedule } from '../_models/exam-schedule';

@Injectable({
  providedIn: 'root'
})
export class ExamScheduleService {
  private baseURL = "http://localhost:8080/ss/exam_schedules";


  constructor(private httpClient: HttpClient) { }

  createExamSchedule(examSchedule: ExamSchedule): Observable<ExamSchedule> {
    return this.httpClient.post<ExamSchedule>(`${this.baseURL}`, examSchedule);
  }

}
