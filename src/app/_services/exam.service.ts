import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../_models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseURL = "http://localhost:8080/api/v1/exams";
  constructor(private httpClient: HttpClient ) { }

  getExamList(page: number, itemsPerPage: number, examType: string, viewType: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("viewType", viewType);

    return this.httpClient.get(`${this.baseURL}` + '?page=' + page +
      "&" + "itemsPerPage=" + itemsPerPage + "&" + "examType=" + examType, { params: queryParams });
  }

  getExamListForStudent(studentId: number, page: number, itemsPerPage: number, examType: string, viewType: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("viewType", viewType);

    return this.httpClient.get(`${this.baseURL}/student/${studentId}` + '?page=' + page +
      "&" + "itemsPerPage=" + itemsPerPage + "&" + "examType=" + examType, { params: queryParams });
  }

  getExamListForSyllabus(syllabusId: number, page: number, itemsPerPage: number, examType: string, viewType: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("viewType", viewType);

    return this.httpClient.get(`${this.baseURL}/syllabus/${syllabusId}` + '?page=' + page +
      "&" + "itemsPerPage=" + itemsPerPage + "&" + "examType=" + examType, { params: queryParams });
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

  cancelExam(examId: number) {
    return this.httpClient.delete(`${this.baseURL}/${examId}`);
  }

}

