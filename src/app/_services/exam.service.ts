import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../_models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseURL = "http://localhost:8080/ss/exams";
  constructor(private httpClient: HttpClient ) { }

  getExamList(page: number, itemsPerPage: number) {
    return this.httpClient.get(`${this.baseURL}` + '?page=' + page +
      "&" + "itemsPerPage=" + itemsPerPage);
  }

  getExamListForStudent(studentId: number, page: number, itemsPerPage: number) {
    return this.httpClient.get(`${this.baseURL}/student/${studentId}` + '?page=' + page +
      "&" + "itemsPerPage=" + itemsPerPage);
  }

  getExamListForSyllabus(syllabusId: number, page: number, itemsPerPage: number) {
    return this.httpClient.get(`${this.baseURL}/syllabus/${syllabusId}` + '?page=' + page +
      "&" + "itemsPerPage=" + itemsPerPage);
  }

  getExamById(id: number): Observable<HttpResponse<Exam>> {
    return this.httpClient.get<Exam>(`${this.baseURL}/${id}`, { observe: 'response' });
  }

  updateExam(id: number, exam: Exam): Observable<Exam> {
    return this.httpClient.put<Exam>(`${this.baseURL}/${id}`, exam);
  }

  createExamApplication(studentId: number, examScheduleId: number): Observable<Exam> {
    return this.httpClient.post<Exam>(`${this.baseURL}/application`, {
      studentId: studentId,
      examScheduleId: examScheduleId
    });
  }

}

