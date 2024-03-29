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

  uploadStudentFile(uploadPayload: [File, number]): Observable<any> {
    const formData = new FormData();
    formData.append("file", uploadPayload[0], uploadPayload[0].name);
    formData.append("userId", uploadPayload[1].toString());
    return this.httpClient
      .post<any>("http://localhost:8080/api/v1/files/users", formData);
  }
}
