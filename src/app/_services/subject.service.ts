import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../_models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseURL = "http://localhost:8080/ss/subjects";
  constructor(private httpClient: HttpClient) { }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${this.baseURL}`);
  }
}
