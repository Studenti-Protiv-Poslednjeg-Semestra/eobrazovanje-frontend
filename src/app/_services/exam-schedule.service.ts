import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamSchedule } from '../_models/exam-schedule';

@Injectable({
  providedIn: 'root'
})
export class ExamScheduleService {
  private baseURL = "http://localhost:8080/api/v1/exam_schedules";


  constructor(private httpClient: HttpClient) { }

  createExamSchedule(examSchedule: ExamSchedule): Observable<ExamSchedule> {
    return this.httpClient.post<ExamSchedule>(`${this.baseURL}`, examSchedule);
  }

  getAllExamSchedules(studentId: any): Observable<ExamSchedule[]> {
    if (studentId != null) {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("studentId", studentId);

      return this.httpClient.get<ExamSchedule[]>(`${this.baseURL}`, { params: queryParams });
    }
    else {
      return this.httpClient.get<ExamSchedule[]>(`${this.baseURL}`);
    }
  }

  getAllExamSchedulesForSubject(subjectId: any): Observable<ExamSchedule[]> {
    return this.httpClient.get<ExamSchedule[]>(`${this.baseURL}/subject/${subjectId}`);
  }

}
