import {HttpClient, HttpResponse, HttpStatusCode} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../_models/subject';
import {SubjectCreationDto} from "../_models/subject-creation-dto";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseURL = "http://localhost:8080/api/v1/subjects";

  constructor(private httpClient: HttpClient) { }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${this.baseURL}`);
  }

  getSubjectsByPage(page: number): Observable<Subject[]>{
    return this.httpClient.get<Subject[]>(`${this.baseURL}?page=${page}`)
  }

  getSubjectsBySyllabus(syllabusId: number): Observable<Subject[]>{
    return this.httpClient.get<Subject[]>(`${this.baseURL}/syllabus/${syllabusId}`)
  }

  createSubject(subjectCreationDto: SubjectCreationDto): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${this.baseURL}`,
      subjectCreationDto,
      { observe: 'response'});
  }

  deleteSubject(subjectId: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete(`${this.baseURL}/${subjectId}`,
        {observe: 'response'});
  }

  getResponsibilities(): Observable<String[]> {
    return this.httpClient
      .get<String[]>(`${this.baseURL}/responsibilities`);
  }

}
