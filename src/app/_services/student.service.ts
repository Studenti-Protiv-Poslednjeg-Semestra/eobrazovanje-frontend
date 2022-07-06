import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseURL = "http://localhost:8080/api/v1/students";

  constructor(private httpClient: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}`);
  }

  getAllStudentsPageAndSize(page: number, size: number): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/pagination?page=${page}&size=${size}`);
  }

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseURL}/${id}`);
  }

  getNewStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/new`);
  }

  addStudentToSyllabus(studentToSyllabus: Object): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/syllabus`, studentToSyllabus);
  }

  enrollmentOnNextSemester(studentId: number): Observable<Student>{
    return this.httpClient.put<Student>(`${this.baseURL}/semester-enrollment`, studentId)
  }

  getNumberOfFinishedExams(studentId: number): Observable<Object>{
    return this.httpClient.get<Object>(`${this.baseURL}/${studentId}/finished-exams`)
  }
}
