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

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseURL}/${id}`);
  }

  getNewStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/new`);
  }

  addStudentToSyllabus(studentId: number, syllabusId:number): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/${studentId}/syllabus/${syllabusId}`, {});
  }
}
